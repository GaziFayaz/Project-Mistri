import React from "react";
import { Magic } from "magic-sdk";

const magic_client = () => {
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_Magic_PUN_API_KEY)
  );
};

export default magic_client;
