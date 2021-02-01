import Head from "next/head";
import CardList from "./CardList";
export default function Home({ probes }) {
  return (
    <div className={`w-full h-screen p-8`}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-4 w-full rounded bg-white bg-opacity-75 text-center rounded-3xl">
        <CardList probes={probes} />
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api`);
  const probes = await res.json();
  return {
    props: {
      probes,
    },
  };
};
