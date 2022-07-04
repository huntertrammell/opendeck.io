import { FunctionComponent } from "react";

export const Footer: FunctionComponent = () => {

    const date = new Date().getFullYear()
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
        <p className="text-center font-bold">
          Built with ❤️ for the Hasnnode x PlanetScale Hackathon
        </p>
        <p className="text-center">
          &copy; {date} <a href="https://huntertrammell.dev">Hunter Trammell</a>
        </p>
      </div>
    </footer>
  );
};
