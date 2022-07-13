import { NextPage } from "next";

const Decks: NextPage = () => {
  return (
    <>
      <section className="min-h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="w-full mx-auto text-5xl sm:text-7xl font-bold">
            Decks <span className="text-primary">API</span>.
          </h1>
        </div>
      </section>
    </>
  );
};

export default Decks;
