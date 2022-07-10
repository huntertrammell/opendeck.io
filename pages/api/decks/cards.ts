import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id: deckId } = JSON.parse(req.body);
    try {
      const deck = await prisma.deck.findFirst({
        where: {
          id: deckId,
        },
        include: {
          deckCards: {
            select: {
              card: {
                include: {
                  user: {
                    select: {
                      name: true,
                      image: true,
                    },
                  },
                  attack: true,
                  xpgain: true,
                },
              },
            },
          },
          _count: {
            select: {
              deckCards: true,
            },
          },
        },
      });

      return res.status(200).json(deck);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else if (req.method === "DELETE") {
    const { id } = JSON.parse(req.body);
    try {
      const deck = await prisma.deckCards.delete({
        where: {
          id: id,
        },
      });

      return res.status(200).json(deck);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
