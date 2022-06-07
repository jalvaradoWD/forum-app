import type { AppProps } from 'next/app';
import { authPersistence } from '../lib/auth';
import { useEffect, useState } from 'react';
import '../styles/globals.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Dialog } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(authPersistence);

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(user, loading);
  }, [user, loading]);

  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              />
            </div>
          </div>
        </div>
      </nav>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
