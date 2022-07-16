import { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { CreateDeck } from "../../../components/forms/createDeck";

const NewDeck: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createDeck = async () => {
    try {
      const response = await fetch("/api/decks/new", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          user_id: session?.user?.id,
        }),
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
        message: "Your deck has been published!",
      });
      router.push("/admin/decks");
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
            Create a <span className="text-primary">new</span> deck.
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
        <div className="flex items-center justify-center pt-8">
          <button
            onClick={createDeck}
            type="button"
            className="bg-primary font-semibold text-white py-2 px-4 rounded hover:opacity-80"
          >
            Publish Deck
          </button>
        </div>
      </section>
    </>
  );
};

export default NewDeck;

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
