import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { ICardProps } from "../../interfaces/ui.interface";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export const Card: FunctionComponent<ICardProps> = ({ card, handleDelete }) => {
  const { data: session, status } = useSession();
  const [apiInProcess, setApiInProcess] = useState(false);
  const router = useRouter();

  let hasUserVoted = false;

  if (card.xpgain) {
    hasUserVoted = card.xpgain.some((xp) => {
      // @ts-ignore
      return xp.user_id === session?.user?.id;
    });
  }

  const showCardControls =
    status === "authenticated" &&
    (router.asPath == "/cards" || router.asPath == "/admin/cards");

  const showCardAdminControls =
      status === "authenticated" && router.asPath === "/admin/cards";

  const getLevel = () => {
    if (card.xp < 200) {
      return 1;
    } else {
      return Math.ceil(card.xp / 200);
    }
  };

  const assignXP = async () => {
    if (hasUserVoted || apiInProcess) {
      return;
    }
    try {
      const response = await fetch("/api/cards/xp", {
        method: "POST",
        body: JSON.stringify({
          // @ts-ignore
          user_id: session?.user?.id,
          card_id: card.id,
        }),
      });

      if (!response.ok) {
        window.bus.publish("alert", {
          type: "error",
          message: response.statusText,
        });
      }

      const { xp, xpgain } = await response.json();

      card.xp = xp;
      card.xpgain = xpgain;
      setApiInProcess(true);
    } catch (error) {
      window.bus.publish("alert", {
        type: "error",
        message: error,
      });
    }
  };

  return (
    <article className="max-w-sm my-4 mx-auto">
      <div className="flex justify-end items-center">
        {showCardAdminControls && (
          <>
            <Link href={`/admin/cards/edit?id=${card.id}`}>
              <a>
                <span className="sr-only">Edit Card</span>
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
            <button onClick={() => handleDelete?.(card?.id as number)}>
              <span className="sr-only">Delete Card</span>
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
        {showCardControls && (
          <>
            <button
              data-a11y-dialog-show="deck-selection-dialog"
              title="Add to deck"
              data-card-id={card.id}
              aria-label="Add to deck"
            >
              <svg
                width="24"
                height="24"
                className="h-10 w-10"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 16L17 18V8L12 6L7 8V18L12 16ZM9 15.0459L12 13.8459L15 15.0459V9.35407L12 8.15407L9 9.35407V15.0459Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              title="Increase XP"
              aria-label="Increase XP"
              className={`${hasUserVoted ? "text-green-500" : ""} font-black`}
              onClick={assignXP}
            >
              XP&uarr;
            </button>
          </>
        )}
      </div>
      <div className="bg-gray-800 p-2 rounded-xl">
        <div className="relative rounded-tl-xl rounded-tr-xl overflow-hidden">
          <span className="bg-gray-800 text-white text-sm italic py-1 px-2 rounded-br-xl absolute top-0 left-0 font-bold">
            Level {getLevel()}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image_path}
            alt={`${card.title} cover art`}
            className="object-cover h-64 w-96"
          />
          <span className="absolute bottom-0 right-0 bg-gray-800 text-white text-sm px-2 py-2 flex items-center justify-center rounded-tl-2xl">
            <span className="rounded-full overflow-hidden h-6 w-6 mr-2">
              <Image
                src={card?.user?.image as string}
                alt={`${card?.user?.name} profile image`}
                height={50}
                width={50}
              />
            </span>
            {card?.user?.name}
          </span>
        </div>
        <div className="text-white py-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl">{card.title}</h3>
            <span className="italic">{card.xp} xp</span>
          </div>
          <p className="text-xs">{card.description}</p>
          <div className="mt-2 p-2 bg-gray-200 rounded-bl-xl rounded-br-xl">
            <ul className="text-gray-800">
              {card.attack &&
                card.attack.map((attack) => (
                  <li
                    key={attack.id}
                    className="leading-none pb-2 border-b border-gray-800 mb-2 last-of-type:border-0 last-of-type:pb-0"
                  >
                    <div className="flex justify-between items-center pb-1">
                      <div className="flex justify-start items-center">
                        <span
                          className={`${classNames({
                            "bg-red-500": attack.type == "Aggressive",
                            "bg-primary": attack.type == "Passive",
                            "bg-green-500": attack.type == "Defensive",
                          })} rounded-full p-1 text-white font-bold text-xs`}
                        >
                          {attack.ap}
                        </span>
                        <span className="text-xl italic font-bold pl-2">
                          {attack.title}
                        </span>
                      </div>
                      <span className="italic text-sm">{attack.type}</span>
                    </div>
                    <span className="text-xs">{attack.description}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};
