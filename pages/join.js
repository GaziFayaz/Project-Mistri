import Image from "next/image";
import Link from "next/link";

import mistrilogo from "../public/mistri_logo_svg.svg";

const join = () => {
  return (
    <div>
      <div className="md:inline-flex sm:flex-col bg-homebg w-screen h-screen">
        <header className="bg-header pr-5 md:max-w-sm">
          <div className="logoButton flex flex-grow items-center">
            <Link href="/">
              <div className=" pr-7 pb-2 pl-4 pt-2">
                <Image
                  src={mistrilogo}
                  height={60}
                  width={60}
                  className="cursor-pointer"
                />
              </div>
            </Link>
            <div className="flex-grow"></div>
            <Link href={"/mistri_login"}>
              <button className=" m-4 py-3 px-3 border-2 border-black rounded-full text-white bg-black font-bold text-xs hover:border-white">
                Have an account?
              </button>
            </Link>
          </div>
          <div className="heading-subheading pl-5 pt-5 space-y-4 max-w-sm">
            <h1 className="heading font-extrabold text-5xl">
              Work With Mistri
            </h1>
            <h3 className="subheading font-semibold  pb-4">
              Make money on your schedule
            </h3>
          </div>
        </header>
        <main className="bg-homebg pl-5 pr-5 py-8 h-screen md:w-2/3 md:flex md:items-center">
          <div className="max-w-2xl mx-auto ">
            <h2 className="form-heading text-3xl text-center font-bold">
              Apply for Interview
            </h2>
            <form className="form pt-8 space-y-4 ">
              <div className="name flex space-x-2 ">
                <input
                  placeholder="First Name"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
                />
                <input
                  placeholder="Last Name"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
                />
              </div>
              <input
                placeholder="Email"
                type="Email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Phone Number"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Address"
                type="Address"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                placeholder="Date of Birth"
                type="Date"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <input
                list="Expertise_selector"
                name="browser"
                placeholder="Select Expertise Category"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <datalist id="Expertise_selector">
                <option value="Carpentry" className="text-extrabold" />
                <option value="Painting" />
                <option value="Electrician" />
                <option value="Waterline" />
                <option value="Sweeping" />
                <option value="Electrician" />
                <option value="Waterline" />
                <option value="Sweeping" />
                <option value="Electrician" />
                <option value="Waterline" />
                <option value="Sweeping" />
                <option value="Electrician" />
                <option value="Waterline" />
                <option value="Sweeping" />
                <option value="Electrician" />
                <option value="Waterline" />
                <option value="Sweeping" />
              </datalist>
              <input
                placeholder="Experience (years)"
                type="number"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-green-700 focus:z-10 sm:text-sm"
              />
              <div className="rounded-full">
                <label
                  htmlFor="file"
                  className="bg-gray-100 py-1.5 pl-2 rounded-l-md text-gray-500"
                >
                  Certifications (if any):{" "}
                </label>
                <input
                  id="file"
                  type="file"
                  className="bg-gray-100 text-gray-500 rounded-r-md"
                  multiple
                />
              </div>

              <button
                type="submit"
                onClick={""}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-bold rounded-md text-green-900 hover:text-black bg-header hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header "
              >
                Submit
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
export default join;
