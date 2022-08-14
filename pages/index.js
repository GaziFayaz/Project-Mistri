import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Center from "./components/Center";
import Header from "./components/Header";
import Slideshow from "./components/Slideshow";
import { sanityClient } from "../lib/Sanity";
import { createClient } from "next-sanity";
// import { fetchservices } from "../lib/fetchservices";
import Link from "next/link";

export default function Home({ services }) {
  return (
    <div>
      <Head>
        <title>MISTRI 1.0</title>
      </Head>

      <Header />

      <main className=" bg-homebg">
        <div>
          <Center />
        </div>
        <Slideshow />
      </main>
    </div>
  );
}
