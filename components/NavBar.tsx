import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { open as openModal } from '../redux/features/signInModal/signInModal';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const NavBar: FC = () => {
  const { data: session } = useSession();

  const dispatch = useDispatch();
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 ">
          <Link href="/">
            <p className="text-white cursor-pointer">Home</p>
          </Link>
          {!session?.user ? (
            <button
              onClick={() => dispatch(openModal())}
              className="text-white"
            >
              Log In
            </button>
          ) : (
            <div className="flex flex-row justify-items-center items-center gap-4">
              <button className="text-white" onClick={() => signOut()}>
                Log Out
              </button>
              <Image
                src={session.user.image! || '/images/guy.jpg'}
                alt="User identity"
                width="50"
                height="50"
                className="rounded-full w-2"
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
