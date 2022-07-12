import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Card } from "../components/ui/card";
import { ICard } from "../interfaces/app.interface";

const About: NextPage = () => {
  const card: ICard = {
    xp: 515,
    user: {
      name: "Your Name",
      image: "/placeholder.png",
    },
    user_id: "test",
    title: "Card Title",
    description: "Card description",
    image_path: "/placeholder.png",
    attack: [
      {
        id: 0,
        title: "Primary Attack",
        description: "Primary Attack Description",
        type: "Passive",
        ap: 34,
      },
      {
        id: 1,
        title: "Secondary Attack",
        description: "Secondary Attack description",
        type: "Defensive",
        ap: 16,
      },
    ],
  };

  return (
    <>
      <section className="min-h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-bold">
            How it all <span className="text-primary">works</span>.
          </h1>
          <p className="sm:w-1/2 w-full pt-4 pb-8 mx-auto">
            Opendeck is an open source deck building platform that facilitates
            the creation and organization of playable cards. The cards and decks
            created by the community can then be consumed via API for use in
            custom games.
          </p>
        </div>
      </section>
      <section className="px-2 py-8">
        <div className="flex justify-center items-center flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold mb-8 text-center md:text-left">
              What can you do with opendeck?
            </h2>
            <ol className="list-decimal font-bold text-3xl text-primary ml-8">
              <li className="mb-4">
                <h3 className="text-gray-800">Create your character</h3>
                <p className="text-gray-800 text-base font-normal">
                  Build a card by completing our card creation form, add a
                  primary and secondary attack as well as descriptions for each.
                </p>
              </li>
              <li className="mb-4">
                <h3 className="text-gray-800">Build a Deck</h3>
                <p className="text-gray-800 text-base font-normal">
                  Select cards created by the community to add to your own
                  custom deck. Theses decks can then be used in your own custom
                  games.
                </p>
              </li>
              <li className="mb-4">
                <h3 className="text-gray-800">Develop a game</h3>
                <p className="text-gray-800 text-base font-normal">
                  Using our API you can pull cards and decks created by the
                  community for use in your own games. What will you build?
                </p>
              </li>
            </ol>
          </div>
          <div className="w-full md:w-1/2">
            <Card card={card} />
          </div>
        </div>
      </section>
      <section className="py-8">
        <h2 className="text-4xl font-bold text-center pb-8">Card Mechanics</h2>
        <ul className="grid gap-4 grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
          <li className="max-w-sm p-4 border-2 border-primary rounded-xl bg-white mx-auto w-full shadow-lg">
            <h3 className="text-3xl font-bold text-center pb-1">Title</h3>
            <p>This is the name of your character or item.</p>
          </li>
          <li className="max-w-sm p-4 border-2 border-primary rounded-xl bg-white mx-auto w-full shadow-lg">
            <h3 className="text-3xl font-bold text-center pb-1">Description</h3>
            <p>
              This text describes your cards title, for example if a card was
              titled &quot;Horse&quot;, a description would be &quot;A golden
              steed as fast as the wind&quot;.
            </p>
          </li>
          <li className="max-w-sm p-4 border-2 border-primary rounded-xl bg-white mx-auto w-full shadow-lg">
            <h3 className="text-3xl font-bold text-center pb-1">XP & Level</h3>
            <p>
              Levels and XP are a fun way to show how a card is valued by the
              community. The higher the XP, the more popular the card. Levels
              increment after every 200 XP gained.
            </p>
          </li>
          <li className="max-w-sm p-4 border-2 border-primary rounded-xl bg-white mx-auto w-full shadow-lg">
            <h3 className="text-3xl font-bold text-center pb-1">
              Primary & Secondary Attack
            </h3>
            <p>
              Each card can have up to 2 attacks, a primary and a secondary. It
              is up to the card creator how the attacks stack up.
            </p>
          </li>
          <li className="max-w-sm p-4 border-2 border-primary rounded-xl bg-white mx-auto w-full shadow-lg">
            <h3 className="text-3xl font-bold text-center pb-1">Attack Type</h3>
            <p>
              Each card can choose 3 different attack types, Passive,
              Aggressive, and Defensive. Passive means that there is no direct
              impact this current turn, Aggressive means that damage is being
              dealt to the opponent and Defensive would be targeting the card
              itself.
            </p>
          </li>
          <li className="max-w-sm p-4 border-2 border-primary rounded-xl bg-white mx-auto w-full shadow-lg">
            <h3 className="text-3xl font-bold text-center pb-1">
              Attack Points
            </h3>
            <p>
              Attack points are how much an attack costs or how much damage the
              attack will do, this is up to the game creator to determine how
              these points are used, but in the context of opendeck we will see
              it as damage done based on the type.
            </p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default About;
