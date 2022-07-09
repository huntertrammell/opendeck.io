import type { NextPage } from "next";
import Link from "next/link";
import { CardList } from "../components/ui/cardList";
import { IHomeProps } from "../interfaces/page.interface";

const Home: NextPage<IHomeProps> = ({ cards }) => {
  return (
    <>
      <section className="h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="sm:w-3/4 w-full mx-auto text-5xl sm:text-7xl font-bold">
            Open source <span className="text-primary">deck building </span>
            community.
          </h1>
          <p className="sm:w-1/2 w-full pt-4 pb-8 mx-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
            itaque facere nostrum ad sed maiores placeat aperiam obcaecati
            quidem alias praesentium tenetur libero, quis eveniet sequi quo, vel
            fuga porro?
          </p>
          <Link href="/about">
            <a className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80">
              How It Works
            </a>
          </Link>
        </div>
      </section>
      <section>
        {cards.length && <CardList cards={cards} />}
        <div className="flex justify-center items-center py-8">
          <Link href="/cards">
            <a className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80">
              View More Cards
            </a>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/cards`, {
    method: "POST",
    body: JSON.stringify({
      take: 3,
      orderBy: {
        xp: "desc",
      },
    }),
  });

  const { cards } = await response.json();

  return {
    props: { cards },
  };
}
