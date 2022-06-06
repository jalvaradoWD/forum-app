import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
} from 'firebase/auth';
import { authPersistence } from '../lib/auth';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <button
        onClick={async () => {
          await authPersistence.setPersistence(browserLocalPersistence);
          return signInWithPopup(authPersistence, new GoogleAuthProvider());
        }}
      >
        Log In
      </button>

      <button
        onClick={() => {
          return authPersistence.signOut();
        }}
      >
        {' '}
        Sign Out
      </button>
    </>
  );
};

export default Home;
