import { NextPage } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Deck } from "../../../components/ui/deck";
import { IUserDeckProps } from "../../../interfaces/page.interface";

const Decks: NextPage<IUserDeckProps> = ({ decks }) => {

  const [filteredDecks, setFilteredDecks] = useState(decks);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/decks/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        console.error(response);
        window.bus.publish("alert", {
          type: "error",
          message: response.statusText,
        });
        return;
      }

      window.bus.publish("alert", {
        type: "success",
        message: "Your deck has been removed!",
      });

      setFilteredDecks(filteredDecks.filter((deck) => deck.id !== id));
    } catch (error) {
      window.bus.publish("alert", {
        type: "error",
        message: error,
      });
    }
  };

  return (
    <>
      <section className="min-h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-bold">
            Your <span className="text-primary">card</span> collections.
          </h1>
          <p className="sm:w-1/2 w-full pt-4 pb-8 mx-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
            itaque facere nostrum ad sed maiores placeat aperiam obcaecati
            quidem alias praesentium tenetur libero, quis eveniet sequi quo, vel
            fuga porro?
          </p>
          <Link href="/admin/decks/create">
            <a className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80">
              New Deck
            </a>
          </Link>
        </div>
      </section>
      <section className="pb-8 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
        {filteredDecks.map((deck) => (
          <Deck deck={deck} key={deck.id} handleDelete={handleDelete} />
        ))}
      </section>
    </>
  );
};

export default Decks;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const response = await fetch(
    //@ts-ignore
    `${process.env.NEXTAUTH_URL}/api/user/decks/${session?.user?.id}`
  );

  const decks = await response.json();

  console.log(decks);

  return {
    props: { session, decks },
  };
}
