import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let deckId;

  if (req.query.id) {
    deckId = req.query.id as string;
  }

  if (req.method === "GET") {
    try {
      const deck = await prisma.deck.findFirst({
        where: {
          id: deckId,
        },
        include: {
          deckCards: {
            select: {
              id: true,
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
        },
      });

      const data = {
        deck,
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
