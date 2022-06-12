import React, { FC } from 'react';
import { ButtonUnstyled } from '@mui/base';
import { signIn } from 'next-auth/react';

const SignInDialog: FC = () => {
  return (
    <div className="w-fit m-12 flex flex-col gap-y-4">
      <ButtonUnstyled
        className="bg-blue-500 text-white rounded p-3"
        variant="contained"
        onClick={async () => signIn('google')}
      >
        Log in with Google
      </ButtonUnstyled>
    </div>
  );
};

export default SignInDialog;
