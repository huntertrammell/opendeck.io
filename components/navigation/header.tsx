import { stat } from "fs";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";

export const Header: FunctionComponent = () => {
  const [isUserMenuExpanded, setIsUserMenuExpanded] = useState(false);
  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  const userImage =
    (session?.user?.image as string) ??
    "https://avatars.dicebear.com/api/adventurer/placeholder.svg";

  return (
    <header>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuExpanded ? true : false}
                onClick={() => setIsMobileMenuExpanded(!isMobileMenuExpanded)}
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuExpanded ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 sm:flex items-center hidden">
                <Link href="/">
                  <a className="text-xl text-white font-bold">opendeck.io</a>
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link href="/about">
                    <a
                      className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      aria-current={
                        router.asPath === "/about" ? "page" : "false"
                      }
                    >
                      How it works
                    </a>
                  </Link>
                  <Link href="/cards">
                    <a
                      className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      aria-current={
                        router.asPath === "/cards" ? "page" : "false"
                      }
                    >
                      Cards
                    </a>
                  </Link>
                  <Link href="/decks">
                    <a
                      className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      aria-current={
                        router.asPath === "/decks" ? "page" : "false"
                      }
                    >
                      Decks
                    </a>
                  </Link>
                  <Link href="/docs">
                    <a
                      className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      aria-current={
                        router.asPath === "/docs" ? "page" : "false"
                      }
                    >
                      API
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                {status === "unauthenticated" && (
                  <button
                    className="bg-primary font-semibold text-white text-base py-2 px-4 rounded hover:opacity-80"
                    onClick={() => signIn("github")}
                  >
                    Sign in with GitHub
                  </button>
                )}
                {status === "authenticated" && (
                  <>
                    <div>
                      <button
                        type="button"
                        className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary overflow-hidden"
                        id="user-menu-button"
                        aria-expanded={isUserMenuExpanded ? true : false}
                        aria-haspopup="true"
                        onClick={() =>
                          setIsUserMenuExpanded(!isUserMenuExpanded)
                        }
                      >
                        <span className="sr-only">Open user menu</span>

                        <span className="h-10 w-10">
                          <Image
                            src={userImage}
                            alt={`${session?.user?.name} Profile Picture`}
                            layout="responsive"
                            width={50}
                            height={50}
                          />
                        </span>
                      </button>
                    </div>
                    {isUserMenuExpanded && (
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex={-1}
                        id="user-menu"
                      >
                        <Link href="/admin">
                          <a className="block px-4 py-2 text-sm text-gray-700">
                            Profile
                          </a>
                        </Link>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex={-1}
                          onClick={() => signOut()}
                        >
                          Log Out
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {isMobileMenuExpanded && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/about">
                <a
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  aria-current={router.asPath === "/about" ? "page" : "false"}
                >
                  How it works
                </a>
              </Link>
              <Link href="/cards">
                <a
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  aria-current={router.asPath === "/cards" ? "page" : "false"}
                >
                  Cards
                </a>
              </Link>
              <Link href="/decks">
                <a
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  aria-current={router.asPath === "/decks" ? "page" : "false"}
                >
                  Decks
                </a>
              </Link>
              <Link href="/docs">
                <a
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  aria-current={router.asPath === "/docs" ? "page" : "false"}
                >
                  API
                </a>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
