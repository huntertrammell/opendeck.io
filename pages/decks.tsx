import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IDeckProps } from "../interfaces/page.interface";

const Decks: NextPage<IDeckProps> = ({ cards, count }) => {
  const { status } = useSession();

  return (
    <>
      <section className="h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="sm:w-3/4 w-full mx-auto text-5xl sm:text-7xl font-bold">
            Curated card decks, built by the <span className="text-primary">community</span>
            .
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
      <section className="pb-8"></section>
    </>
  );
};

export default Decks;
