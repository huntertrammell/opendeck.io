import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card } from "../../components/ui/card";
import { IDeckListingPageProps } from "../../interfaces/page.interface";

const DeckListing: NextPage<IDeckListingPageProps> = ({ deck }) => {
  const { status } = useSession();
  console.log(deck);

  return (
    <>
      <section className="min-h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="w-full mx-auto text-5xl sm:text-7xl font-bold">
            {deck.title}
          </h1>
          <p className="sm:w-1/2 w-full py-4 mx-auto">{deck.description}</p>
        </div>
      </section>
      <section>
        <div className="flex justify-start items-center flex-col sm:flex-row w-full">
          <span className="text-gray-700 font-bold text-lg  ml-2">
            {deck._count.deckCards} cards
          </span>
        </div>
        <div className="pb-8 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
          {deck.deckCards.map((card, index) => (
            <Card card={card.card} key={index} />
          ))}
        </div>
      </section>
    </>
  );
};

export default DeckListing;

export async function getServerSideProps(context: any) {
  const deck_id = context.params.id;

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/decks/cards`, {
    method: "POST",
    body: JSON.stringify({
      id: deck_id,
    }),
  });

  const deck = await response.json();

  return {
    props: { deck },
  };
}
