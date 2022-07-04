import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { ICardProps } from "../../interfaces/ui.interface";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const Card: FunctionComponent<ICardProps> = ({ card }) => {
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

  const showVoteBtn = status === "authenticated" && router.asPath === "/cards";

  const getLevel = () => {
    if (card.xp < 500) {
      return 1;
    } else {
      return Math.floor(card.xp / 500);
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
        console.error(response);
      }

      const { xp, xpgain } = await response.json();

      card.xp = xp;
      card.xpgain = xpgain;
      setApiInProcess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="max-w-sm my-4 mx-auto">
      <div className="flex justify-end items-center">
        {showVoteBtn && (
          <button onClick={assignXP}>
            <span className="sr-only">Increase XP</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`${hasUserVoted ? "text-green-500" : ""} h-10 w-10`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                fill="currentColor"
              />
            </svg>
          </button>
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
                src={card.user.image}
                alt={`${card.user.name} profile image`}
                height={50}
                width={50}
              />
            </span>
            {card.user.name}
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
