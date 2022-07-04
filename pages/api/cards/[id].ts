import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let cardId;

  if (req.query.id) {
    cardId = +req.query.id;
  }

  if (req.method === "GET") {
    try {
      const data = await prisma.card.findUnique({
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
