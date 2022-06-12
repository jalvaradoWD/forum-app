import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';

const Home: NextPage = () => {
  useEffect(() => {});
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <h1 className="text-center text-5xl underline my-5">Forum App</h1>

      <button
        onClick={async () => {}}
        className="bg-blue-800 text-white p-5 rounded w-full"
      >
        Test Button
      </button>
    </>
  );
};

export default Home;
