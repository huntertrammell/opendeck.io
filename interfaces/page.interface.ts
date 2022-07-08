import { ICard } from "./app.interface";

export interface IHomeProps {
    cards: ICard[]
}

export interface ICardProps {
    cards: ICard[];
    count: number
}

export interface IEditCardProps {
    card: ICard
}