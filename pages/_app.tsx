import { Dialog } from '@mui/material';
import { signOut } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Provider, useDispatch, useSelector } from 'react-redux';
import SignInDialog from '../components/SignInDialog';
import { auth } from '../lib/firebase';
import { RootState, store } from '../redux/app/store';
import {
  close as closeModal,
  open as openModal,
} from '../redux/features/signInModal/signInModal';
import '../styles/globals.css';

const SignInModal: FC = () => {
  const isOpen = useSelector((state: RootState) => state.SignInModal.isOpen);
  const dispatch = useDispatch();
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        dispatch(closeModal());
      }}
    >
      <SignInDialog />
    </Dialog>
  );
};

const NavBar: FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-end h-16 ">
          {!user ? (
            <button
              onClick={() => dispatch(openModal())}
              className="text-white"
            >
              Log In
            </button>
          ) : (
            <button className="text-white" onClick={() => signOut(auth)}>
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NavBar />
      <SignInModal />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
