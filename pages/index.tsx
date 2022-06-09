import { addDoc, collection, getDocs } from 'firebase/firestore';
import type { NextPage } from 'next';
import Head from 'next/head';
import { db } from '../lib/firebase';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <h1 className="text-center text-5xl underline my-5">Forum App</h1>

      <button
        onClick={async () => {
          const col = collection(db, 'testingCollection');
          const docRef = await addDoc(col, {
            firstName: 'Joanna',
            lastName: 'Alvarado',
            age: 17,
          });

          console.log(docRef);
        }}
        className="bg-blue-800 text-white p-5 rounded w-full"
      >
        Hello
      </button>
    </>
  );
};

export default Home;
