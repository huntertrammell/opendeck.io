import { NextPage } from "next";
import { CreateDeck } from "../../../components/forms/createDeck";

const NewDeck: NextPage = () => {
  return (
    <>
      <section className="h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-bold">
            Create a <span className="text-primary">new</span> deck.
          </h1>
          <p className="sm:w-1/2 w-full pt-4 pb-8 mx-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
            itaque facere nostrum ad sed maiores placeat aperiam obcaecati
            quidem alias praesentium tenetur libero, quis eveniet sequi quo, vel
            fuga porro?
          </p>
        </div>
      </section>
      <section>
        <CreateDeck />
        <div className="flex items-center justify-center pt-8">
          <button className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80">
            Publish Deck
          </button>
        </div>
      </section>
    </>
  );
};

export default NewDeck;
