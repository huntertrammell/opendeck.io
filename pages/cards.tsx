import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CardList } from "../components/ui/cardList";
import { ICardProps } from "../interfaces/page.interface";

const Card: NextPage<ICardProps> = ({ cards }) => {
  const { status } = useSession();

  return (
    <>
      <section className="h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-bold text-primary">
            Community Driven
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
        <CardList cards={cards} />
      </section>
    </>
  );
};

export default Card;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/cards");

  const data = await response.json();

  return {
    props: { cards: data },
  };
}
