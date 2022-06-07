import type { NextPage } from 'next';
import Head from 'next/head';
import { auth } from '../lib/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <h1 className="text-center text-5xl underline my-5">Forum App</h1>
      {!user || (
        <>
          <h1>Currently Logged in user is {user!.email}</h1>
        </>
      )}
    </>
  );
};

export default Home;
