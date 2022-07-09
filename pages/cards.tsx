import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CardList } from "../components/ui/cardList";
import { ICardProps } from "../interfaces/page.interface";

const Card: NextPage<ICardProps> = ({ cards, count }) => {
  const { status } = useSession();
  const [sortOption, setSortOption] = useState("Newest");
  const [sortedCards, setSortedCards] = useState(cards);
  const [currentCount, setCurrentCount] = useState(cards.length);

  const options = ["Newest", "Oldest", "Highest XP", "Lowest XP", "Title"];

  useEffect(() => {
    const fetchCards = async (orderBy: any) => {
      try {
        const response = await fetch("/api/cards", {
          method: "POST",
          body: JSON.stringify({
            take: currentCount,
            orderBy: orderBy,
          }),
        });

        if (!response.ok) {
          window.bus.publish("alert", {
            type: "error",
            message: response.statusText,
          });
        }

        const { cards } = await response.json();
        setSortedCards(cards);
      } catch (error) {
        window.bus.publish("alert", {
          type: "error",
          message: error,
        });
      }
    };

    switch (sortOption) {
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
  }, [currentCount, sortOption]);

  const loadMore = () => {
    if (currentCount < count - 20) {
      setCurrentCount(currentCount + 20);
    } else {
      setCurrentCount(currentCount + (count - currentCount));
    }
  };

  const sortCards = (e: React.FormEvent<HTMLSelectElement>) => {
    setSortOption(e.currentTarget.value);
  };

  return (
    <>
      <section className="h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-bold">
            The <span className="text-primary">global</span> deck.
          </h1>
          <p className="sm:w-1/2 w-full pt-4 pb-8 mx-auto">
            This deck contains all cards created by the community. Show some
            love by giving your favorite cards an XP boost or adding them to a
            deck of your&nbsp;own!
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
      <section className="pb-8">
        <div className="flex justify-between items-center flex-col sm:flex-row w-full">
          <span className="text-gray-700 font-bold text-lg  ml-2">
            Showing {currentCount} of {count}
          </span>
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
        {currentCount < count && (
          <div className="py-8 flex items-center justify-center">
            <button
              className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80 disabled:bg-gray-800 disabled:cursor-not-allowed"
              type="button"
              onClick={loadMore}
              disabled={currentCount - count == 0}
              aria-disabled={currentCount - count == 0}
            >
              Show more
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Card;

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/cards`, {
    method: "POST",
    body: JSON.stringify({
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
    }),
  });

  const { cards, count } = await response.json();

  return {
    props: { cards, count },
  };
}
