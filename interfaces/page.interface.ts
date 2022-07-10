import { ICard, IDeck } from "./app.interface";

export interface IHomeProps {
    cards: ICard[]
}

export interface ICardProps {
    cards: ICard[];
    count: number
}

export interface IDeckProps {
  decks: IDeck[];
  count: number;
}

export interface IEditCardProps {
    card: ICard
}

export interface IDeckListingPageProps {
    deck: IDeck;
}

export interface IEditDeckProps {
    deck: IDeck;
}

export interface IUserDeckProps {
  decks: IDeck[];
}