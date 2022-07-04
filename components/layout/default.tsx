import Link from "next/link";
import { FunctionComponent } from "react";
import { ILayoutProps } from "../../interfaces/layout.interface";

export const Layout: FunctionComponent<ILayoutProps> = ({ children }) => {
  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-8">
      {children}
    </main>
  );
};
