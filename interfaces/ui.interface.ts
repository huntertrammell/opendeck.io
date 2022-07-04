import { ICard } from "./app.interface";

export interface ICardListProps {
    cards: ICard[];
    filterDelete?: (id:number) => any;
}

export interface ICardProps {
    card: ICard;
    handleDelete?: (id: number) => void;
}