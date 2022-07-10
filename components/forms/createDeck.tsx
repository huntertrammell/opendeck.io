import { FunctionComponent } from "react";
import { ICreateDeckProps } from "../../interfaces/forms.interface";

export const CreateDeck: FunctionComponent<ICreateDeckProps> = ({
  title,
  setTitle,
  description,
  setDescription,
}) => {
  const handleChange = (
    e: React.FormEvent<HTMLInputElement>,
    setState: (value: any) => void
  ) => {
    setState(e.currentTarget.value);
  };

  return (
    <form className="px-2 mt-4 py-2 w-full md:w-1/2 mx-auto">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => handleChange(e, setTitle)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(e) => handleChange(e, setDescription)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </form>
  );
};
