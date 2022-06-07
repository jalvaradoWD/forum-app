import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { auth } from '../lib/auth';
import { FormLabel, Input } from '@mui/material';
import { ButtonUnstyled } from '@mui/base';
import { useDispatch } from 'react-redux';
import { close as closeModal } from '../redux/features/signInModal/signInModal';

const SignInDialog: FC = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signInWithEmailAndPassword(
      auth,
      formState.email,
      formState.password
    );

    if (res.user) {
      dispatch(closeModal());
    }
  };

  return (
    <div className="w-fit m-12 flex flex-col gap-y-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
        <div className="flex flex-col">
          <FormLabel color="primary" required htmlFor="email">
            Email
          </FormLabel>
          <Input
            id="email"
            name="email"
            type="text"
            onChange={onInputChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <FormLabel color="primary" required htmlFor="password">
            Password
          </FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={onInputChange}
            required
            autoComplete="true"
          />
        </div>
        <ButtonUnstyled
          variant="contained"
          type="submit"
          className="bg-black text-white rounded p-3"
        >
          Sign In
        </ButtonUnstyled>
      </form>

      <ButtonUnstyled
        className="bg-blue-500 text-white rounded p-3"
        variant="contained"
        onClick={async () => {
          const res = await signInWithPopup(auth, new GoogleAuthProvider());
          if (res.user) {
            dispatch(closeModal());
          }
        }}
      >
        Sign in with Google
      </ButtonUnstyled>
    </div>
  );
};

export default SignInDialog;
