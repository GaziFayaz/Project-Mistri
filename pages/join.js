import Image from "next/image";
import Link from "next/link";

import mistrilogo from "../public/mistri_logo_svg.svg";

const join = () => {
  return (
    <div>
      <header className="bg-header">
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
          <button className=" m-4 py-3 px-3 rounded-full text-white bg-black font-semibold">
            Have an account?
          </button>
        </div>
        <div className="heading-subheading pl-5 pt-5 space-y-4">
          <h1 className="heading font-extrabold text-5xl">Work With Mistri</h1>
          <h3 className="subheading font-semibold  pb-4">
            Make money on your schedule
          </h3>
        </div>
      </header>
      
    </div>
  );
};
export default join;
