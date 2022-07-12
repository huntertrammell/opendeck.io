import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Deck } from "../../components/ui/deck";
import { IDeck } from "../../interfaces/app.interface";
import { IDeckProps } from "../../interfaces/page.interface";

const Decks: NextPage<IDeckProps> = ({ decks, count }) => {
  const { status } = useSession();
  const [paginatedDecks, setPaginatedDecks] = useState<IDeck[]>(decks);
  const [currentCount, setCurrentCount] = useState(decks.length);

  const loadMore = () => {
    if (currentCount < count - 20) {
      setCurrentCount(currentCount + 20);
    } else {
      setCurrentCount(currentCount + (count - currentCount));
    }
  };

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch("/api/decks", {
          method: "POST",
          body: JSON.stringify({
            take: currentCount,
            orderBy: {
              createdAt: "desc",
            },
          }),
        });

        if (!response.ok) {
          window.bus.publish("alert", {
            type: "error",
            message: response.statusText,
          });
        }

        const { decks } = await response.json();
        setPaginatedDecks(decks);
      } catch (error) {
        window.bus.publish("alert", {
          type: "error",
          message: error,
        });
      }
    };

    fetchDecks();
  }, [currentCount]);

  return (
    <>
      <section className="min-h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="w-full mx-auto text-5xl sm:text-7xl font-bold">
            Curated card decks, built by the&nbsp;
            <span className="text-primary">community</span>.
          </h1>
          <p className="sm:w-1/2 w-full pt-4 pb-8 mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            expedita explicabo voluptatibus obcaecati voluptates labore ea
            similique numquam omnis inventore ratione corporis tempore dolorum,
            sint optio nisi, asperiores id molestias.
          </p>
          {status === "authenticated" && (
            <Link href="admin/decks/create">
              <a className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80">
                New Deck
              </a>
            </Link>
          )}
        </div>
      </section>
      <section>
        <div className="flex justify-start items-center flex-col sm:flex-row w-full">
          <span className="text-gray-700 font-bold text-lg  ml-2">
            Showing {currentCount} of {count}
          </span>
        </div>
        <div className="pb-8 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
          {paginatedDecks.map((deck) => (
            <Deck deck={deck} key={deck.id} />
          ))}
        </div>
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

export default Decks;

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/decks`, {
    method: "POST",
    body: JSON.stringify({
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
    }),
  });

  const { decks, count } = await response.json();

  return {
    props: { decks, count },
  };
}
