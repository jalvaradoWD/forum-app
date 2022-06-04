import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <h1 className="text-5xl text-center my-2">This is a test</h1>
      <article className="prose lg:prose-xl md:container mx-auto border-2 p-5 border-orange-600 rounded-lg m-5 shadow-lg">
        <h1 className="uppercase font-black text-center  text-4xl mb-5">
          Hello world
        </h1>
      </article>
    </>
  );
};

export default Home;
