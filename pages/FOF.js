import React from "react";
import Image from "next/image";
import mistrilogo from "../public/mistri_logo_svg.svg";
import Link from "next/link";

const FOF = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-homebg text-2xl">
      <div className="flex flex-col">
        <Link href="/">
          <Image
            src={mistrilogo}
            height={100}
            width={100}
            className=" cursor-pointer"
          />
        </Link>
        404 | Page Not Found
      </div>
    </div>
  );
};

export default FOF;
