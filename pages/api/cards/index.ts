import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let takeCount = 20;
  if (req.query.limit) takeCount = +(req.query.limit as string);

  if (req.method === "GET") {
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
        },
        take: takeCount,
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
