import axios from 'axios';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { AppContext } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';

interface ICategory {
  name: string;
  id: string;
  description: string;
}

const Home: NextPage<{
  categories: ICategory[] | undefined;
}> = ({ categories }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session, status);
  });

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <h1 className="text-center text-5xl underline my-5">Forum App</h1>
      {session?.user?.image ? (
        <img src={session?.user?.image} alt="Profile" />
      ) : null}

      <p>{session?.user?.email}</p>

      <ul>
        {categories
          ? categories.map((item, index) => (
              <li
                key={item.id}
                className="border-2 border-red-500 mx-4 my-2 p-4"
              >
                <p className="text-center text-5xl font-bold">{item.name}</p>
                <p className="text-xl">{item.description}</p>
              </li>
            ))
          : null}
      </ul>
    </>
  );
};

export async function getServerSideProps(context: AppContext) {
  const res = await fetch('http://localhost:3000/api/category');
  const categories: ICategory[] = await res.json();

  return {
    props: { categories },
  };
}

export default Home;
