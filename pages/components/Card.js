import Image from "next/image";
import React, { useState } from "react";
import me from "../../public/me.jpg";

const card = () => {
  const [ImageButton, setImageButton] = useState(true);
  const [image, setImage] = useState([]);

  const uploadImageButton = () => {};
  return (
    <div>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        {/* <div className="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
          </button>
        </div> */}
        <div className="flex flex-row items-center py-4">
          <div className=" items-center pr-4 pl-4 flex-grow">
            <Image
              src={me}
              defaultValue={image}
              height={100}
              width={100}
              className="mb-3 w-24 h-24 rounded-full shadow-lg"
            />
            <input
              id="image"
              type="file"
              onChange={(event) => {
                const files = event.target.files;
                console.log(files);
                setImage([
                  ...image,
                  {
                    id: image.length,
                    value: files[0],
                  },
                ]);
              }}
              accept=".pdf, image/png, image/jpg, image/jpeg"
              className="bg-gray-100 text-gray-500 rounded-r-md cursor-pointer"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Bonnie Green
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Visual Designer
            </span>
          </div>

          <div className=" flex space-x-3 md:mt-6 mr-4">
            <a
              href="#"
              className={
                !ImageButton
                  ? "disabled cursor-not-allowed inline-flex items-center"
                  : "py-2 px-4 text-sm font-medium text-center cursor-pointer inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }
            >
              Upload
            </a>
            <a
              href="#"
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Message
            </a>
          </div>
        </div>
        <div className="px-4 py-4">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Experiences
          </h5>
          {/* Experiences */}
          <span className="text-sm text-gray-500 dark:text-gray-400"></span>
        </div>

        <div className="px-4 py-4">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Certifications
          </h5>
          {/* Certifications */}
          <span className="text-sm text-gray-500 dark:text-gray-400"></span>
        </div>
      </div>
    </div>
  );
};

export default card;
