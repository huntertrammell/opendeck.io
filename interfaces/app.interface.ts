import { Session } from "next-auth";

export interface ICard {
  id?: number;
  title: string;
  description: string;
  image_path: string;
  attack: IAttack[];
  xp: number;
  user?: IUser;
  user_id?: string;
  xpgain?: IXP[];
}

export interface IAttack {
  id?: number;
  title: string;
  description: string;
  type: string;
  ap: number;
  card_id?: number;
}

export interface IUser {
  name: string;
  image: string;
}

export interface IXP {
  id: number;
  user_id: string;
  card_id: number;
  createdAt: string;
}

export interface IAlert {
  uid: string;
  type: string;
  message: string;
}

export interface IDeck {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  user: IUser;
  deckCards: { id?: number; card: ICard }[];
  _count: {
    deckCards: number;
  };
}

export interface appSession extends Session {
  id: string;
}