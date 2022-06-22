import { Forum } from '@prisma/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { IForum } from '../lib/interfaces/DatabaseInterfaces';

const Home: NextPage<{
  forums: IForum[];
}> = ({ forums }) => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <ul>
        {forums
          ? forums.map((item) => (
              <li
                key={item.id}
                className="border-4 border-red-900 mx-4 my-2 p-4 flex flex-col gap-4 rounded"
              >
                <div>
                  <p className="text-center text-5xl font-bold">{item.name}</p>
                  <p className="text-center text-xl">{item.description}</p>
                </div>

                <ul className="flex flex-col gap-2">
                  {item.Category.map((subCat) => (
                    <li key={subCat.id} className="flex w-full">
                      <Link href={`/c/${subCat.id}`} passHref>
                        <a className="py-1 w-full text-blue-700 font-bold border-2 text-center capitalize text-lg cursor-pointer hover:bg-blue-700 hover:text-white hover:border-transparent transition rounded">
                          {subCat.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))
          : null}
      </ul>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/forum');
  const forums: Forum[] = await res.json();

  return {
    props: { forums },
  };
}

export default Home;
