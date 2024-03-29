import { useRouter } from "next/router";

const Center = () => {
  const router = useRouter();
  return (
    <div className=" text-black text-center py-44 text-5xl">
      Find the perfect <b>Mistri</b> for your house
      <br></br>
      <button
        onClick={(e) => {
          router.push("/exploreservices");
        }}
        className=" m-4 p-4 border-2 py-1 text-center px-8 rounded-full border-header hover:bg-header hover:text-white text-4xl font-bold"
      >
        Explore!
      </button>
    </div>
  );
};

export default Center;
