import { ICard, IDeck } from "./app.interface";

export interface ICardListProps {
  cards: ICard[];
  filterDelete?: (id: number) => any;
}

export interface ICardProps {
  card: ICard;
  handleDelete?: (id: number) => void;
}

export interface IDeckProps {
  deck: IDeck;
  handleDelete?: (id: string) => void;
}
