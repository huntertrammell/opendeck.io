/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CreateDeck } from "../../../components/forms/createDeck";
import { IEditDeckProps } from "../../../interfaces/page.interface";

const EditDeck: NextPage<IEditDeckProps> = ({ deck }) => {
  const router = useRouter();

  const { data: session } = useSession();

  const [title, setTitle] = useState(deck.title);
  const [description, setDescription] = useState(deck.description);
  const [filteredDeck, setFilteredDeck] = useState(deck.deckCards);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/decks/cards`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
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
        message: "Your card has been removed!",
      });

      setFilteredDeck(filteredDeck.filter((card) => card.id !== id));
    } catch (error) {
      window.bus.publish("alert", {
        type: "error",
        message: error,
      });
    }
  };

  const handleSubmission = async () => {
    try {
      const response = await fetch(`/api/decks/${deck.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
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
        message: "Your deck has been updated!",
      });
        
        router.push('/admin/decks')
    } catch (error) {
      window.bus.publish("alert", {
        type: "error",
        message: error,
      });
    }
  };

  const props = {
    title,
    setTitle,
    description,
    setDescription,
  };

  return (
    <>
      <section className="min-h-96 py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl sm:text-7xl font-bold">
            <span className="text-primary">Update</span> your deck.
          </h1>
          <p className="sm:w-1/2 w-full pt-4 pb-8 mx-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
            itaque facere nostrum ad sed maiores placeat aperiam obcaecati
            quidem alias praesentium tenetur libero, quis eveniet sequi quo, vel
            fuga porro?
          </p>
        </div>
      </section>
      <section>
        <CreateDeck {...props} />
        <h2 className="text-center py-6 font-bold text-2xl">Cards</h2>
        <table className="px-2 mt-4 py-2 w-full md:w-1/2 mx-auto">
          <thead className="font-bold border-b-2 border-gray-800 px-2">
            <tr>
              <th>ID</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Description</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeck.map((card) => (
              <tr
                key={card.card.id}
                className="bg-white border-b-2 border-gray-400"
              >
                <td className="px-2">{card.card.id}</td>
                <td><img className="h-24 w-24 object-cover" src={card.card.image_path} alt={`${card.card.title} Cover Art`} /></td>
                <td className="px-2">{card.card.title}</td>
                <td className="px-2">{card.card.description}</td>
                <td className="px-2">
                  <button onClick={() => handleDelete?.(card?.id as number)}>
                    <span className="sr-only">Delete Card From Deck</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 mx-auto"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center pt-8">
          <button
            type="button"
            onClick={handleSubmission}
            className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80"
          >
            Publish Changes
          </button>
        </div>
      </section>
    </>
  );
};

export default EditDeck;

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

  const deck_id = context.query.id;

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/decks/edit?id=${deck_id}`
  );

  const { deck } = await response.json();
  //@ts-ignore
  if (deck.user_id !== session.user.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { deck },
  };
}
