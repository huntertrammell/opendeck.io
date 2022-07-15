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
  if (req.method !== "GET") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  try {
    await limiter.check(res, 50, "CACHE_TOKEN"); // 10 requests per minute
  } catch {
    return res.status(429).json({ error: "Rate limit exceeded" });
  }

  let deckId;
  if (req.query.id) {
    deckId = req.query.id as string;
  }

  try {
    const data = await prisma.deck.findUnique({
      where: {
        id: deckId,
      },
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
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
