import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Deck } from "../../components/ui/deck";
import { IDeckProps } from "../../interfaces/page.interface";

const Decks: NextPage<IDeckProps> = ({ decks, count }) => {
  const { status } = useSession();

  return (
    <>
      <section className="h-96 py-10 flex items-center justify-center">
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
      <section className="pb-8 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
        {decks.map((deck) => (
          <Deck deck={deck} key={deck.id} />
        ))}
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
