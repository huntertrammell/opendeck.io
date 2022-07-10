import { Session } from "next-auth";

export interface ICreateCardProps {
  session: Session | null;
  title: string;
  setTitle: (title: string) => any;
  description: string;
  setDescription: (description: string) => any;
  image_path: string;
  setImagePath: (image_path: string) => any;
  primaryTitle: string;
  setPrimaryTitle: (primaryTitle: string) => any;
  primaryDescription: string;
  setPrimaryDescription: (primaryDescription: string) => any;
  primaryType: string;
  setPrimaryType: (primaryType: string) => any;
  primaryAP: number;
  setPrimaryAP: (primaryAP: number) => any;
  secondaryTitle: string;
  setSecondaryTitle: (secondaryTitle: string) => any;
  secondaryDescription: string;
  setSecondaryDescription: (secondaryDescription: string) => any;
  secondaryType: string;
  setSecondaryType: (secondaryType: string) => any;
  secondaryAP: number;
  setSecondaryAP: (secondaryAP: number) => any;
}

export interface ICreateDeckProps {
  title: string;
  setTitle: (title: string) => any;
  description: string;
  setDescription: (description: string) => any;
}