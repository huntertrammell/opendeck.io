import type { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { uid } from "uid";
import { CreateCard } from "../../components/forms/create";
import { Card } from "../../components/ui/card";
import { ICard } from "../../interfaces/app.interface";
import { supabase } from "../../lib/supabase";

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

  const card: ICard = {
    xp: 0,
    user: {
      name: session?.user?.name as string,
      image: (session?.user?.image as string) ?? "/placeholder.png",
    },
    user_id: "test",
    title,
    description,
    image_path,
    attack: [
      {
        title: primaryTitle,
        description: primaryDescription,
        type: primaryType,
        ap: primaryAP,
      },
      {
        title: secondaryTitle,
        description: secondaryDescription,
        type: secondaryType,
        ap: secondaryAP,
      },
    ],
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

  const props = {
    session,
    title,
    setTitle,
    description,
    setDescription,
    image_path,
    setImagePath,
    primaryTitle,
    setPrimaryTitle,
    primaryDescription,
    setPrimaryDescription,
    primaryType,
    setPrimaryType,
    primaryAP,
    setPrimaryAP,
    secondaryTitle,
    setSecondaryTitle,
    secondaryDescription,
    setSecondaryDescription,
    secondaryType,
    setSecondaryType,
    secondaryAP,
    setSecondaryAP,
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
        <CreateCard {...props}/>
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
