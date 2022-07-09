import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  const takeInput = body.take ? body.take : undefined;
  const orderByInput = body.orderBy ? body.orderBy : undefined;
  const skipInput = body.skip ? body.skip : undefined;

  if (req.method === "POST") {
    try {
      const cards = await prisma.deck.findMany({
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
        },
        take: takeInput,
        skip: skipInput,
        orderBy: orderByInput,
      });

      const count = await prisma.deck.count();

      const data = {
        cards,
        count,
      };
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
