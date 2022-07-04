export interface ICard {
    id: number;
    title: string;
    description: string;
    image_path: string;
    attack: IAttack[];
    xp: number;
    user: IUser;
    user_id: string;
}

export interface IAttack {
    id: number;
    title: string;
    description: string;
    type: string;
    ap: number;
    card_id: number;
}

export interface IUser {
    name: string;
    image: string;
}