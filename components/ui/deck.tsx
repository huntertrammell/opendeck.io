import { FunctionComponent } from "react";
import Image from "next/image";
import { IDeckProps } from "../../interfaces/ui.interface";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const Deck: FunctionComponent<IDeckProps> = ({ deck, handleDelete }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const showDeckAdminControls =
    status === "authenticated" && router.asPath == "/admin/decks";

  return (
    <article className="max-w-sm my-4 mx-auto">
      <div className="flex justify-end items-center">
        {showDeckAdminControls && (
          <>
            <Link href={`/admin/decks/edit?id=${deck.id}`}>
              <a>
                <span className="sr-only">Edit Deck</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="h-7 w-7 mr-4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z"
                    fill="currentColor"
                  />
                  <path
                    d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </Link>
            <button onClick={() => handleDelete?.(deck.id)}>
              <span className="sr-only">Delete Deck</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="h-8 w-8 mr-4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                  fill="currentColor"
                />
                <path d="M9 9H11V17H9V9Z" fill="currentColor" />
                <path d="M13 9H15V17H13V9Z" fill="currentColor" />
              </svg>
            </button>
          </>
        )}
      </div>
      <div className="bg-gray-800 p-2 rounded-xl">
        <div className="text-white rounded-xl">
          <div className="relative rounded-tl-xl rounded-tr-xl overflow-hidden">
            <span className="absolute top-0 left-0 bg-gray-800 text-white text-sm px-2 py-2 flex items-center justify-center rounded-br-2xl">
              <span className="rounded-full overflow-hidden h-6 w-6 mr-2">
                <Image
                  src={deck?.user?.image as string}
                  alt={`${deck?.user?.name} profile image`}
                  height={50}
                  width={50}
                />
              </span>
              {deck?.user?.name}
            </span>
            <span className="absolute top-0 right-0 bg-gray-800 text-white p-2 rounded-bl-xl">
              {deck._count.deckCards}
            </span>
            <div className="relative h-64 w-96">
              {deck.deckCards.length ? (
                <Image
                  src={deck.deckCards[0].card.image_path}
                  alt={`${deck.deckCards[0].card.title} cover art`}
                  className="object-cover"
                  layout="fill"
                />
              ) : (
                <Image
                  src="/placeholder.png"
                  alt={`placeholder cover art`}
                  className="object-cover"
                  layout="fill"
                />
              )}
            </div>
          </div>
          <div className="p-2">
            <div className="pb-6">
              <h3 className="font-bold text-xl">{deck.title}</h3>
              <p className="text-xs">{deck.description}</p>
            </div>
            <Link href={`/decks/${deck.id}`}>
              <a className="bg-primary block text-center font-semibold text-white py-2 px-4 rounded hover:opacity-80">
                View Deck
              </a>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
