import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(401).json({ message: "Nothing to see here" });
    return;
  }
  const session = await getSession({ req: req });

  if (!session) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }

  const newCard = JSON.parse(req.body);

  try {
    const data = await prisma.deckCards.create({
      data: {
        ...newCard,
      },
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
