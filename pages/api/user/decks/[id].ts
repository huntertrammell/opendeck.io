import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let userId;

  if (req.query.id) {
    userId = req.query.id as string;
  }

  if (req.method === "GET") {
    try {
      const data = await prisma.deck.findMany({
        where: {
          user_id: userId,
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
        take: 20,
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
