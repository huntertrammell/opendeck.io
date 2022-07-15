import { NextPage } from "next";
import { useEffect, useState } from "react";
import { JSONTree } from "react-json-tree";

const Decks: NextPage = () => {
  const [allDecks, setAllDecks] = useState([]);
  const [singleDeck, setSingleDeck] = useState([]);

  useEffect(() => {
    const getDecks = async () => {
      try {
        const response = await fetch("/api/v1/decks", {
          method: "POST",
          body: JSON.stringify({
            take: 2,
            orderBy: {
              createdAt: "asc",
            },
          }),
        });

        const data = await response.json();

        setAllDecks(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getSingleDeck = async () => {
      try {
        const response = await fetch("/api/v1/decks/cl5epxn5820246dyhloqdgzob");

        const data = await response.json();

        setSingleDeck(data);
      } catch (error) {
        console.error(error);
      }
    };

    getDecks();
    getSingleDeck();
  }, []);

  const postBody = {
    take: 5,
    skip: 5,
    orderBy: {
      createdAt: "desc",
    },
  };

  return (
    <>
      <section className="min-h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="w-full mx-auto text-5xl sm:text-7xl font-bold">
            Decks <span className="text-primary">API</span>.
          </h1>
        </div>
      </section>
      <section className="py-8">
        <div className="flex justify-center md:flex-row flex-col">
          <div className="w-full md:w-1/2 p-2">
            <h2 className="text-2xl font-bold text-primary">/api/v1/decks</h2>
            <p>
              Using this API endpoint you can retrieve decks created by the
              community, methods are available to assist with pagination and
              sorting.
            </p>
            <ul className="list-disc ml-4 pt-4">
              <li>
                <span className="font-bold">Method:</span> POST
              </li>
              <li>
                <span className="font-bold">Body:</span>
                <ul className="list-disc ml-4">
                  <li>
                    <span className="font-bold">Take:</span> Defaults to 20, the
                    amount of decks to retrieve.
                  </li>
                  <li>
                    <span className="font-bold">Skip:</span> The amount of decks
                    to skip.
                  </li>
                  <li>
                    <span className="font-bold">OrderBy:</span> Defaults to
                    createdAt sorted by desc. The sorting method to be used in
                    the call.
                  </li>
                </ul>
              </li>
            </ul>
            <div className="mt-2">
              <span className="font-bold">Example Body:</span>
              <pre className="p-2 bg-gray-800 text-white">
                {JSON.stringify(postBody, null, 2)}
              </pre>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-2">
            <span className="font-bold">Example Response:</span>
            <JSONTree
              data={allDecks}
              hideRoot={true}
              shouldExpandNode={(keyPath, data, level) => {
                return level == 1 && keyPath[0] ? true : false;
              }}
            />
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="flex justify-center md:flex-row flex-col">
          <div className="w-full md:w-1/2 p-2">
            <h2 className="text-2xl font-bold text-primary">
              /api/v1/decks/[id]
            </h2>
            <p>
              Using this API endpoint you can retrieve a deck by it&apos;s ID.
            </p>
            <ul className="list-disc ml-4 pt-4">
              <li>
                <span className="font-bold">Method:</span> GET
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 p-2">
            <span className="font-bold">Example Response:</span>
            <JSONTree data={singleDeck} hideRoot={true} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Decks;
