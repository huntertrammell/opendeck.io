import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const body = JSON.parse(req.body)
  const takeInput = body.take ? body.take : undefined;
  const orderByInput = body.orderBy ? body.orderBy : undefined;

  if (req.method === "POST") {
    try {
      const data = await prisma.card.findMany({
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
          attack: true,
          xpgain: true
        },
        take: takeInput,
        orderBy: orderByInput,
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
