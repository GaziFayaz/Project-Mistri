import Head from "next/head";
import Header from "./components/Header";

const manage_account = () => {
  return (
    <div className="bg-homebg">
      <Head>
        <title>MISTRI 1.0</title>
      </Head>

      <Header />

      <main className="pt-14">
        <div className="sidebar">hello</div>
      </main>
    </div>
  );
};
export default manage_account;
