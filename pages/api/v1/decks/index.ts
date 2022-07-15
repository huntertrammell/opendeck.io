import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import rateLimit from "../../../../lib/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const body = JSON.parse(req.body);
  const takeInput = body.take ? body.take : 20;
  const orderByInput = body.orderBy ? body.orderBy : undefined;
  const skipInput = body.skip ? body.skip : undefined;

  try {
    await limiter.check(res, 50, "CACHE_TOKEN"); // 10 requests per minute
  } catch {
    return res.status(429).json({ error: "Rate limit exceeded" });
  }

  try {
    const decks = await prisma.deck.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        deckCards: {
          select: {
            card: true,
          },
        },
        _count: {
          select: {
            deckCards: true,
          },
        },
      },
      take: takeInput,
      skip: skipInput,
      orderBy: orderByInput,
    });

    return res.status(200).json(decks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
