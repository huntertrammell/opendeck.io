import { create } from "domain";
import type { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { ICard } from "../../interfaces/app.interface";

const NewCard: NextPage = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const [title, setTitle] = useState("Character Name");
  const [description, setDescription] = useState("Describe your character!");
  const [image_path, setImagePath] = useState("/placeholder.png");

  const [primaryTitle, setPrimaryTitle] = useState("Primary attack name");
  const [primaryDescription, setPrimaryDescription] = useState(
    "Primary attack description"
  );
  const [primaryType, setPrimaryType] = useState("Passive");
  const [primaryAP, setPrimaryAP] = useState(0);

  const [secondaryTitle, setSecondaryTitle] = useState("Secondary attack name");
  const [secondaryDescription, setSecondaryDescription] = useState(
    "Secondary attack description"
  );
  const [secondaryType, setSecondaryType] = useState("Passive");
  const [secondaryAP, setSecondaryAP] = useState(0);

  const types = ["Passive", "Aggressive", "Defensive"];

  const card: ICard = {
    id: 0,
    xp: 0,
    user: {
      name: session?.user?.name as string,
      image: (session?.user?.image as string) ?? "/placeholder.png",
    },
    user_id: "test",
    title,
    description,
    image_path,
    xpgain: [],
    attack: [
      {
        id: 0,
        title: primaryTitle,
        description: primaryDescription,
        type: primaryType,
        ap: primaryAP,
        card_id: 0,
      },
      {
        id: 1,
        title: secondaryTitle,
        description: secondaryDescription,
        type: secondaryType,
        ap: secondaryAP,
        card_id: 0,
      },
    ],
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement>,
    setState: (value: any) => void
  ) => {
    setState(e.currentTarget.value);
  };

  const handleSelectChange = (
    e: React.FormEvent<HTMLSelectElement>,
    setState: (value: any) => void
  ) => {
    setState(e.currentTarget.value);
  };

  const createNewCard = async () => {
    const card = {
      title,
      description,
      xp: 0,
      image_path,
      // @ts-ignore
      user_id: session?.user?.id,
    };
    const attacks = [
      {
        title: primaryTitle,
        description: primaryDescription,
        type: primaryType,
        ap: +primaryAP,
      },
      {
        title: secondaryTitle,
        description: secondaryDescription,
        type: secondaryType,
        ap: +secondaryAP,
      },
    ];

    try {
      const response = await fetch("/api/cards/new", {
        method: "POST",
        body: JSON.stringify({ card, attacks }),
      });

      if (!response.ok) {
        console.error(response);
        window.bus.publish("alert", {
          type: "error",
          message: response.statusText,
        });
        return;
      }
      window.bus.publish("alert", {
        type: "success",
        message: "Your card has been published!",
      });
      router.push("/admin");
    } catch (error) {
      window.bus.publish("alert", {
        type: "error",
        message: error,
      });
    }
  };
  return (
    <>
      <section className="h-64 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-bold text-primary">
            Create a new card
          </h1>
        </div>
      </section>
      <section className="flex items-center flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <Card card={card} />
          <div className="flex items-center justify-center pt-8">
            <button
              onClick={createNewCard}
              className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80"
            >
              Publish Card
            </button>
          </div>
        </div>
        <form className="px-2 mt-4 py-2 w-full md:w-1/2">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => handleChange(e, setTitle)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => handleChange(e, setDescription)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image_path"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Cover Art
            </label>
            <input
              type="url"
              id="image_path"
              name="image_path"
              placeholder="https://your.image.url"
              onChange={(e) => handleChange(e, setImagePath)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <fieldset>
            <legend className="font-bold mb-4">Primary Attack</legend>
            <div className="mb-4">
              <label
                htmlFor="attack_title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="attack_title"
                name="attack_title"
                value={primaryTitle}
                onChange={(e) => handleChange(e, setPrimaryTitle)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="attack_description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <input
                type="text"
                id="attack_description"
                name="attack_description"
                value={primaryDescription}
                onChange={(e) => handleChange(e, setPrimaryDescription)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="mb-4 w-full md:w-1/2 md:pr-2">
                <label
                  htmlFor="attack_type"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Type
                </label>
                <select
                  id="attack_type"
                  name="attack_type"
                  value={primaryType}
                  onChange={(e) => handleSelectChange(e, setPrimaryType)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 w-full md:w-1/2 md:pl-2">
                <label
                  htmlFor="attack_ap"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Attack Points
                </label>
                <input
                  type="number"
                  min={0}
                  value={primaryAP}
                  onChange={(e) => handleChange(e, setPrimaryAP)}
                  id="attack_ap"
                  name="attack_ap"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-bold mb-4">Secondary Attack</legend>
            <div className="mb-4">
              <label
                htmlFor="attack_title_2"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="attack_title_2"
                name="attack_title_2"
                value={secondaryTitle}
                onChange={(e) => handleChange(e, setSecondaryTitle)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="attack_description_2"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <input
                type="text"
                id="attack_description_2"
                name="attack_description_2"
                value={secondaryDescription}
                onChange={(e) => handleChange(e, setSecondaryDescription)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="mb-4 w-full md:w-1/2 md:pr-2">
                <label
                  htmlFor="attack_type_2"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Type
                </label>
                <select
                  id="attack_type_2"
                  name="attack_type_2"
                  value={secondaryType}
                  onChange={(e) => handleSelectChange(e, setSecondaryType)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 w-full md:w-1/2 md:pl-2">
                <label
                  htmlFor="attack_ap_2"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Attack Points
                </label>
                <input
                  type="number"
                  min={0}
                  id="attack_ap_2"
                  name="attack_ap_2"
                  value={secondaryAP}
                  onChange={(e) => handleChange(e, setSecondaryAP)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
};

export default NewCard;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
