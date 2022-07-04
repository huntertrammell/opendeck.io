import { FunctionComponent } from "react";
import { ICardListProps } from "../../interfaces/ui.interface";
import { Card } from "./card";

export const CardList: FunctionComponent<ICardListProps> = ({ cards }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4">
      {cards &&
        cards.map((card, index) => {
          return <Card card={card} key={index} />;
        })}
    </section>
  );
};
