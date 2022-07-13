import { NextPage } from "next";
import Link from "next/link";

const Docs: NextPage = () => {
  return (
    <>
      <section className="min-h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="w-full mx-auto text-5xl sm:text-7xl font-bold">
            opendeck <span className="text-primary">API</span>.
          </h1>
          <p className="sm:w-1/2 w-full pt-4 pb-8 mx-auto">
            See how you can utilize opendeck in your application using our API
            service to query cards and decks directly into your app! Our API has
            3 endpoints that you can use to pull data. Get cards, decks and
            cards/decks by user. Note that all requests are limited to 50
            requests per minute.
          </p>
        </div>
      </section>
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center py-16">
          Choose your endpoint:
        </h2>
        <ul className="grid gap-4 grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
          <li>
            <Link href="/docs/cards">
              <a className="hover:scale-105 max-w-sm p-4 border-2 border-primary rounded-xl bg-white mx-auto w-full shadow-lg flex items-center justify-center">
                <h3 className="text-3xl font-bold text-center p-8">
                  /api/v1/cards
                </h3>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/docs/decks">
              <a className="hover:scale-105 max-w-sm p-4 border-2 border-primary rounded-xl bg-white mx-auto w-full shadow-lg flex items-center justify-center">
                <h3 className="text-3xl font-bold text-center p-8">
                  /api/v1/decks
                </h3>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/docs/users">
              <a className="hover:scale-105 max-w-sm p-4 border-2 border-primary rounded-xl bg-white mx-auto w-full shadow-lg flex items-center justify-center">
                <h3 className="text-3xl font-bold text-center p-8">
                  /api/v1/users
                </h3>
              </a>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Docs;
