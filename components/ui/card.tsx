import Image from "next/image";
import { FunctionComponent } from "react";
import { ICardProps } from "../../interfaces/ui.interface";
import classNames from "classnames";

export const Card: FunctionComponent<ICardProps> = ({ card }) => {
  const getLevel = () => {
    if (card.xp < 500) {
      return 1;
    } else {
      return Math.floor(card.xp / 500);
    }
  };
  return (
    <article className="max-w-sm my-4 mx-auto">
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
