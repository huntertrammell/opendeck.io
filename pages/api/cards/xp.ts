import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user_id: userId, card_id: cardId } = JSON.parse(req.body);

    try {
      const data = await prisma.card.update({
        where: {
          id: cardId,
        },
        data: {
          xp: {
            increment: 15,
          },
          xpgain: {
            create: [
              {
                user_id: userId,
              },
            ],
          },
        },
        select: {
          xp: true,
          xpgain: true,
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
