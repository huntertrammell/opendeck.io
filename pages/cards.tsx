import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { CardList } from "../components/ui/cardList";
import { ICardProps } from "../interfaces/page.interface";

const Card: NextPage<ICardProps> = ({ cards }) => {
  const { status } = useSession();
  const [sortedCards, setSortedCards] = useState(cards);

  const options = ["Newest", "Oldest", "Highest XP", "Lowest XP", "Title"];

  const sortCards = async (e: React.FormEvent<HTMLSelectElement>) => {
    switch (e.currentTarget.value) {
      case "Newest":
        fetchCards({ createdAt: "desc" });
        break;
      case "Oldest":
        fetchCards({ createdAt: "asc" });
        break;
      case "Highest XP":
        fetchCards({ xp: "desc" });
        break;
      case "Lowest XP":
        fetchCards({ createdAt: "asc" });
        break;
      case "Title":
        fetchCards({ title: "asc" });
        break;
    }
  };

  const fetchCards = async (orderBy: any) => {
    try {
      const response = await fetch("http://localhost:3000/api/cards", {
        method: "POST",
        body: JSON.stringify({
          take: 20,
          orderBy: orderBy,
        }),
      });

      if (!response.ok) {
        window.bus.publish("alert", {
          type: "error",
          message: response.statusText,
        });
      }

      const data = await response.json();
      setSortedCards(data);
    } catch (error) {
      window.bus.publish("alert", {
        type: "error",
        message: error,
      });
    }
  };

  return (
    <>
      <section className="h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-bold text-primary">
            Lorem Ipsum
          </h1>
          <p className="sm:w-1/2 w-full pt-4 pb-8 mx-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
            itaque facere nostrum ad sed maiores placeat aperiam obcaecati
            quidem alias praesentium tenetur libero, quis eveniet sequi quo, vel
            fuga porro?
          </p>
          {status === "authenticated" && (
            <Link href="/admin/create">
              <a className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80">
                New Card
              </a>
            </Link>
          )}
        </div>
      </section>
      <section>
        <div className="flex justify-end items-center flex-col sm:flex-row w-full">
          <div>
            <label
              htmlFor="attack_type_2"
              className="text-gray-700 font-bold mr-2"
            >
              Sort By:
            </label>
            <select
              id="attack_type_2"
              name="attack_type_2"
              onChange={sortCards}
              className="shadow border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        {cards.length && <CardList cards={sortedCards} />}
      </section>
    </>
  );
};

export default Card;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/cards", {
    method: "POST",
    body: JSON.stringify({
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
    }),
  });

  const data = await response.json();

  return {
    props: { cards: data },
  };
}
