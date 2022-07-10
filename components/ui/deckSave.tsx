import { FunctionComponent, useEffect, useState } from "react";
import A11yDialog from "a11y-dialog";
import { useSession } from "next-auth/react";
import { IDeck } from "../../interfaces/app.interface";
import Link from "next/link";

export const DeckSave: FunctionComponent = () => {
  const { data: session } = useSession();
  const [decks, setDecks] = useState([]);
  const [cardId, setCardId] = useState(0);

  useEffect(() => {
    const dialogEl = document.getElementById(
      "deck-selection-dialog"
    ) as HTMLElement;
    const dialog = new A11yDialog(dialogEl);

    dialog.on("show", (_, event) => {
      const card_id = (event?.currentTarget as HTMLButtonElement)?.getAttribute(
        "data-card-id"
      );
      if (card_id) {
        setCardId(+card_id);
      }
    });

    const getDecks = async () => {
      try {
        //@ts-ignore
        const response = await fetch(`/api/decks/${session?.user?.id}`);

        if (!response.ok) {
          window.bus.publish("alert", {
            type: "error",
            message: response.statusText,
          });
        }

        const data = await response.json();
        setDecks(data.decks);
      } catch (error) {
        window.bus.publish("alert", {
          type: "error",
          message: error,
        });
      }
    };
    getDecks();
  }, [session]);

  const addToDeck = async (deckId: string) => {
    try {
      //@ts-ignore
      const response = await fetch("/api/decks/add", {
        method: "POST",
        body: JSON.stringify({
          card_id: cardId,
          deck_id: deckId,
        }),
      });

      if (!response.ok) {
        window.bus.publish("alert", {
          type: "error",
          message: response.statusText,
        });
        return;
      }

      window.bus.publish("alert", {
        type: "success",
        message: "Card has been added to your deck",
      });
    } catch (error) {
      window.bus.publish("alert", {
        type: "error",
        message: error,
      });
    }
  };

  return (
    <div
      className="flex fixed top-0 bottom-0 left-0 right-0 z-10 dialog-container"
      id="deck-selection-dialog"
      aria-hidden="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <div
        className="fixed top-0 left-0 bottom-0 right-0 bg-gray-800 bg-opacity-90 animate-fade-in"
        data-a11y-dialog-hide
      ></div>
      <div
        className="bg-gray-200 animate-fade-in relative w-96 m-auto p-4"
        role="document"
      >
        <button
          data-a11y-dialog-hide
          className="absolute top-1 right-3 font-bold text-2xl"
          aria-label="Close this dialog window"
        >
          &times;
        </button>

        <h3 id="dialog-title" className="text-xl font-bold text-center">
          Select a deck
        </h3>

        <p id="dialog-description" className="text-center">
          Choose what deck to save your card into:
        </p>
        <div className="pt-4">
          {decks.map((deck: IDeck) => (
            <button
              key={deck.id}
              className="bg-primary block w-full my-2 text-center font-semibold text-white py-2 px-4 rounded hover:opacity-80"
              type="button"
              onClick={() => addToDeck(deck.id)}
            >
              {deck.title}
            </button>
          ))}
          {decks.length === 0 && (
            <Link href="admin/decks/create">
              <a className="bg-primary block w-full text-center font-semibold text-white py-2 px-4 rounded hover:opacity-80">
                Create New Deck
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
