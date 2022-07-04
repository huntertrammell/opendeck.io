import type { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { CardList } from "../../components/ui/cardList";
import { ICard } from "../../interfaces/app.interface";

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
      <section className="h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-bold text-primary">
            Your Card Library
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
        <div className="flex justify-between items-center flex-col sm:flex-row w-full">
          <h2 className="text-2xl font-bold">Recent Cards</h2>
          <div>Filter</div>
        </div>
        {cards.length ? <CardList cards={cards} filterDelete={filterDelete} /> : <p className="bold text-xl text-center py-32">You haven&apos;t created any cards yet 🥲</p>}
      </section>
    </>
  );
};

export default Admin;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  const response = await fetch(
    //@ts-ignore
    `http://localhost:3000/api/user/cards/${session?.user?.id}`
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
