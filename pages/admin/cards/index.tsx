import type { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { CardList } from "../../../components/ui/cardList";
import { ICard } from "../../../interfaces/app.interface";

const Admin: NextPage = ({ cards: loadedCards }: any) => {
  const { data, status } = useSession();
  const [cards, setCards] = useState(loadedCards);

  const filterDelete = (id: number) => {
    setCards(
      cards.filter((card: ICard) => {
        return card.id !== id;
      })
    );
  };

  return (
    <>
      <section className="min-h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-bold">
            Your Card <span className="text-primary">Library</span>.
          </h1>
          <p className="sm:w-1/2 w-full pt-4 pb-8 mx-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
            itaque facere nostrum ad sed maiores placeat aperiam obcaecati
            quidem alias praesentium tenetur libero, quis eveniet sequi quo, vel
            fuga porro?
          </p>
          <Link href="/admin/cards/create">
            <a className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80">
              New Card
            </a>
          </Link>
        </div>
      </section>
      <section>
        {cards.length ? (
          <CardList cards={cards} filterDelete={filterDelete} />
        ) : (
          <p className="bold text-xl text-center py-32">
            You haven&apos;t created any cards yet 🥲
          </p>
        )}
      </section>
    </>
  );
};

export default Admin;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  const response = await fetch(
    //@ts-ignore
    `${process.env.NEXTAUTH_URL}/api/user/cards/${session?.user?.id}`
  );

  const data = await response.json();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { cards: data },
  };
}
