import { FunctionComponent, useState } from "react";
import { ICardListProps } from "../../interfaces/ui.interface";
import { Card } from "./card";
import { DeckSave } from "./deckSave";

export const CardList: FunctionComponent<ICardListProps> = ({
  cards,
  filterDelete,
}) => {
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        window.bus.publish("alert", {
          type: "error",
          message: response.statusText,
        });
      }

      window.bus.publish("alert", {
        type: "success",
        message: "Your card has been deleted",
      });

      filterDelete?.(id);
    } catch (error) {
      window.bus.publish("alert", {
        type: "error",
        message: error,
      });
    }
  };
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
        {cards &&
          cards.map((card, index) => {
            return <Card card={card} key={index} handleDelete={handleDelete} />;
          })}
          </section>
          <DeckSave />
    </>
  );
};
