import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { IAttack } from "../../../interfaces/app.interface";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let cardId;

  if (req.query.id) {
    cardId = +req.query.id;
  }

  const session = await getSession({ req: req });

  if (req.method === "GET") {
    try {
      const data = await prisma.card.findUnique({
        where: {
          id: cardId,
        },
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
      });

      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else if (req.method === "PUT") {
    const session = await getSession({ req: req });

    if (!session) {
      return res.status(401).json({ message: "Not Authenticated!" });
    }

    const { card, attacks } = JSON.parse(req.body);

    try {
      const data = await prisma.card.update({
        where: {
          id: cardId,
        },
        data: {
          ...card,
          attack: {
            deleteMany: {
              id: {
                in: attacks.map((attack: IAttack) => attack.id),
              },
            },
            createMany: {
              data: [...attacks],
            },
          },
        },
        include: {
          attack: true,
        },
      });

      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else if (req.method === "DELETE") {
    if (!session) {
      return res.status(401).json({ message: "Not Authenticated!" });
    }

    try {
      const deleteAttacks = await prisma.attack.deleteMany({
        where: {
          card_id: cardId,
        },
      });

      const data = await prisma.card.delete({
        where: {
          id: cardId,
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
