import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import NavBar from '../components/NavBar';
import SignInModal from '../components/SignInModal';
import { store } from '../redux/app/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <NavBar />
        <SignInModal />
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
