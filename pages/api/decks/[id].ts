import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req: req });
  let id;

  if (req.query.id) {
    id = req.query.id as string;
  }

  if (req.method === "GET") {
    try {
      const decks = await prisma.deck.findMany({
        where: {
          user_id: id,
        },
        select: {
          id: true,
          title: true,
        },
      });

      const data = {
        decks,
      };

      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else if (req.method === "PUT") {
    if (!session) {
      return res.status(401).json({ message: "Not Authenticated!" });
    }

    const { title, description } = JSON.parse(req.body);
    try {
      const deck = await prisma.deck.update({
        where: {
          id: id,
        },
        data: {
          title,
          description,
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
  } else if (req.method === "DELETE") {
    if (!session) {
      return res.status(401).json({ message: "Not Authenticated!" });
    }
    try {
      const deleteDeckCards = await prisma.deckCards.deleteMany({
        where: {
          deck_id: id,
        },
      });

      const deleteDeck = await prisma.deck.delete({
        where: {
          id: id,
        },
      });

      return res.status(200).json(deleteDeck);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
