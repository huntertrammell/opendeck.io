import type { NextPage } from "next";
import Link from "next/link";
import { CardList } from "../components/ui/cardList";
import { IHomeProps } from "../interfaces/page.interface";

const Home: NextPage<IHomeProps> = ({ cards }) => {
  return (
    <>
      <section className="h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-bold text-primary">
            LOGO HERE
          </h1>
          <p className="sm:w-1/2 w-full pt-4 pb-8 mx-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
            itaque facere nostrum ad sed maiores placeat aperiam obcaecati
            quidem alias praesentium tenetur libero, quis eveniet sequi quo, vel
            fuga porro?
          </p>
          <Link href="/docs">
            <a className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80">
              API Documentation
            </a>
          </Link>
        </div>
      </section>
      <section className="h-96 py-8 flex items-center flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="text-5xl sm:text-7xl font-bold text-primary">Lorem Ipsum</h2>
          <p className="pt-4 pb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            provident accusantium quasi fugit pariatur, voluptatem magni aliquid
            voluptatibus laborum a! Fugit veritatis accusamus, pariatur dolor
            dolores adipisci suscipit nulla esse?
          </p>
          <Link href="/about">
            <a className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80">
              How It Works
            </a>
          </Link>
        </div>
        <div>

        </div>
      </section>
      <section>{cards.length && <CardList cards={cards} />}</section>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/cards", {
    method: "POST",
    body: JSON.stringify({
      take: 3,
      orderBy: {
        xp: "desc",
      },
    }),
  });

  const data = await response.json();

  return {
    props: { cards: data },
  };
}
