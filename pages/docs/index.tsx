import { NextPage } from "next";
import Link from "next/link";

const Docs: NextPage = () => {
  return (
    <>
      <section className="min-h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="w-full mx-auto text-5xl sm:text-7xl font-bold">
            The opendeck <span className="text-primary">API</span>.
          </h1>
          <p className="sm:w-1/2 w-full pt-4 pb-8 mx-auto">
            See how you can utilize opendeck in your application using our API
            service to query cards and decks directly into your app! Note that
            all requests are limited to 50 requests per minute.
          </p>
          <a
            href="/insomnia.json"
            className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80 inline-flex items-center justify-center"
            download
          >
            <svg
              width="24"
              height="24"
              className="text-white pr-2"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V12.1578L16.2428 8.91501L17.657 10.3292L12.0001 15.9861L6.34326 10.3292L7.75748 8.91501L11 12.1575V5Z"
                fill="currentColor"
              />
              <path
                d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
                fill="currentColor"
              />
            </svg>{" "}
            Download Insomnia Package
          </a>
        </div>
      </section>
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center">
          Choose your endpoint:
        </h2>
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 py-16">
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
        </ul>
      </section>
    </>
  );
};

export default Docs;
