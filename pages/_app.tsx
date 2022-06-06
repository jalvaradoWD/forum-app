import type { AppProps } from 'next/app';
import { authPersistence } from '../lib/auth';
import { useEffect } from 'react';
import '../styles/globals.css';
import { useAuthState } from 'react-firebase-hooks/auth';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(authPersistence);
  useEffect(() => {
    console.log(user, loading);
  }, [user, loading]);

  return <Component {...pageProps} />;
}

export default MyApp;
