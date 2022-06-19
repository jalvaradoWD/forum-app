import { Forum } from '@prisma/client';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { IForum } from '../lib/interfaces/Categories';

const Home: NextPage<{
  forums: IForum[] | undefined;
}> = ({ forums }) => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <h1 className="text-center text-5xl underline my-5">Forum App</h1>
      {session?.user?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={session?.user?.image} alt="Profile" />
      ) : null}

      <p>{session?.user?.email}</p>

      <button type="button">Generate Posts</button>

      <ul>
        {forums
          ? forums.map((item, index) => (
              <li
                key={item.id}
                className="border-2 border-red-500 mx-4 my-2 p-4"
              >
                <p className="text-center text-5xl font-bold">{item.name}</p>
                <p className="text-xl">{item.description}</p>

                <ul>
                  {item.Category.map((subCat) => (
                    <li key={subCat.id}>
                      <Link href={`/c/${subCat.id}`}>{subCat.name}</Link>
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

export async function getServerSideProps(context: any) {
  const res = await fetch('http://localhost:3000/api/forum');
  const forums: Forum[] = await res.json();

  return {
    props: { forums },
  };
}

export default Home;
