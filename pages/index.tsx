import axios from 'axios';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState<
    {
      name: string;
      description: string;
      id: string;
    }[]
  >([]);
  useEffect(() => {
    console.log(session, status);
  });

  const loadCategories = async () => {
    const res = await axios.get('/api/category');
    setCategories(res.data);
  };

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
      <button
        className="bg-black text-white p-3 rounded-xl mx-4"
        onClick={loadCategories}
      >
        Load Categories
      </button>
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

export default Home;
