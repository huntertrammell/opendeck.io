import type { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CreateCard } from "../../../components/forms/createCard";
import { Card } from "../../../components/ui/card";
import { ICard } from "../../../interfaces/app.interface";
import { IEditCardProps } from "../../../interfaces/page.interface";

const EditCard: NextPage<IEditCardProps> = ({ card }) => {
  const router = useRouter();

  const { data: session } = useSession();

  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [image_path, setImagePath] = useState(card.image_path);

  const [primaryTitle, setPrimaryTitle] = useState(card.attack[0].title);
  const [primaryDescription, setPrimaryDescription] = useState(
    card.attack[0].description
  );
  const [primaryType, setPrimaryType] = useState(card.attack[0].type);
  const [primaryAP, setPrimaryAP] = useState(card.attack[0].ap);

  const [secondaryTitle, setSecondaryTitle] = useState(card.attack[1].title);
  const [secondaryDescription, setSecondaryDescription] = useState(
    card.attack[1].description
  );
  const [secondaryType, setSecondaryType] = useState(card.attack[1].type);
  const [secondaryAP, setSecondaryAP] = useState(card.attack[1].ap);

  const userCard: ICard = {
    id: card.id,
    xp: card.xp,
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
        id: card.attack[0].id,
        title: primaryTitle,
        description: primaryDescription,
        type: primaryType,
        ap: primaryAP,
      },
      {
        id: card.attack[1].id,
        title: secondaryTitle,
        description: secondaryDescription,
        type: secondaryType,
        ap: secondaryAP,
      },
    ],
  };

  const editCard = async () => {
    const card = {
      title,
      description,
      image_path,
      // @ts-ignore
      user_id: session?.user?.id,
    };

    const attacks = [
      {
        id: userCard.attack[0].id,
        title: primaryTitle,
        description: primaryDescription,
        type: primaryType,
        ap: +primaryAP,
      },
      {
        id: userCard.attack[1].id,
        title: secondaryTitle,
        description: secondaryDescription,
        type: secondaryType,
        ap: +secondaryAP,
      },
    ];

    try {
      const response = await fetch(`/api/cards/${userCard.id}`, {
        method: "PUT",
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
        message: "Your card has been updated!",
      });
      router.push("/admin/cards");
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
      <section className="h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-bold">
            <span className="text-primary">Update</span> an existing card.
          </h1>
          <p className="sm:w-1/2 w-full pt-4 pb-8 mx-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
            itaque facere nostrum ad sed maiores placeat aperiam obcaecati
            quidem alias praesentium tenetur libero, quis eveniet sequi quo, vel
            fuga porro?
          </p>
        </div>
      </section>
      <section className="flex items-center flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <Card card={userCard} />
          <div className="flex items-center justify-center pt-8">
            <button
              onClick={editCard}
              className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80"
            >
              Publish Card Changes
            </button>
          </div>
        </div>
        <CreateCard {...props} />
      </section>
    </>
  );
};

export default EditCard;

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

  const card_id = context.query.id;

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/cards/${card_id}`);

  const card = await response.json();

  //@ts-ignore
  if (card.user_id !== session.user.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { card },
  };
}
