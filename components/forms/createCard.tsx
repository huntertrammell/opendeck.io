import { FunctionComponent } from "react";
import { ICreateCardProps } from "../../interfaces/forms.interface";
import { supabase } from "../../lib/supabase";
import { uid } from "uid";

export const CreateCard: FunctionComponent<ICreateCardProps> = ({
  session,
  title,
  setTitle,
  description,
  setDescription,
  image_path,
  setImagePath,
  primaryTitle,
  setPrimaryTitle,
  primaryDescription,
  setPrimaryDescription,
  primaryType,
  setPrimaryType,
  primaryAP,
  setPrimaryAP,
  secondaryTitle,
  setSecondaryTitle,
  secondaryDescription,
  setSecondaryDescription,
  secondaryType,
  setSecondaryType,
  secondaryAP,
  setSecondaryAP,
}) => {
  const types = ["Passive", "Aggressive", "Defensive"];

  const handleChange = (
    e: React.FormEvent<HTMLInputElement>,
    setState: (value: any) => void
  ) => {
    setState(e.currentTarget.value);
  };

  const handleSelectChange = (
    e: React.FormEvent<HTMLSelectElement>,
    setState: (value: any) => void
  ) => {
    setState(e.currentTarget.value);
  };

  const handleUpload = async (e: React.FormEvent<HTMLInputElement>) => {
    let file;

    if (e.currentTarget.files) {
      file = e.currentTarget.files[0];
    }

    try {
      const { data, error } = await supabase.storage
        .from("images")
        //@ts-ignore
        .upload(`${session?.user?.id}/${uid()}${file.name}`, file);

      if (error) {
        window.bus.publish("alert", {
          type: "error",
          message: error,
        });
        return;
      }

      const publicURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data?.Key}`;

      setImagePath(publicURL);
    } catch (error) {
      window.bus.publish("alert", {
        type: "error",
        message: error,
      });
    }
  };

  return (
    <form className="px-2 mt-4 py-2 w-full md:w-1/2">
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
      <div className="mb-4">
        <label
          htmlFor="image_path"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Cover Art
        </label>
        <input
          type="file"
          id="image_path"
          name="image_path"
          placeholder="https://your.image.url"
          onChange={(e) => handleUpload(e)}
          className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <fieldset>
        <legend className="font-bold mb-4">Primary Attack</legend>
        <div className="mb-4">
          <label
            htmlFor="attack_title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="attack_title"
            name="attack_title"
            value={primaryTitle}
            onChange={(e) => handleChange(e, setPrimaryTitle)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="attack_description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="attack_description"
            name="attack_description"
            value={primaryDescription}
            onChange={(e) => handleChange(e, setPrimaryDescription)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="mb-4 w-full md:w-1/2 md:pr-2">
            <label
              htmlFor="attack_type"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Type
            </label>
            <select
              id="attack_type"
              name="attack_type"
              value={primaryType}
              onChange={(e) => handleSelectChange(e, setPrimaryType)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 w-full md:w-1/2 md:pl-2">
            <label
              htmlFor="attack_ap"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Attack Points
            </label>
            <input
              type="number"
              min={0}
              value={primaryAP}
              onChange={(e) => handleChange(e, setPrimaryAP)}
              id="attack_ap"
              name="attack_ap"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend className="font-bold mb-4">Secondary Attack</legend>
        <div className="mb-4">
          <label
            htmlFor="attack_title_2"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="attack_title_2"
            name="attack_title_2"
            value={secondaryTitle}
            onChange={(e) => handleChange(e, setSecondaryTitle)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="attack_description_2"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="attack_description_2"
            name="attack_description_2"
            value={secondaryDescription}
            onChange={(e) => handleChange(e, setSecondaryDescription)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="mb-4 w-full md:w-1/2 md:pr-2">
            <label
              htmlFor="attack_type_2"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Type
            </label>
            <select
              id="attack_type_2"
              name="attack_type_2"
              value={secondaryType}
              onChange={(e) => handleSelectChange(e, setSecondaryType)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 w-full md:w-1/2 md:pl-2">
            <label
              htmlFor="attack_ap_2"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Attack Points
            </label>
            <input
              type="number"
              min={0}
              id="attack_ap_2"
              name="attack_ap_2"
              value={secondaryAP}
              onChange={(e) => handleChange(e, setSecondaryAP)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
};
