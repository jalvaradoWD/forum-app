import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { ButtonUnstyled } from '@mui/base';
import { signIn } from 'next-auth/react';
import { IUserCredentials } from '../lib/auth';
import axios from 'axios';

const SignInDialog: FC = () => {
  const [formData, setFormData] = useState<IUserCredentials>({
    email: '',
    password: '',
  });

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await axios.post('/api/user/register', formData);
    return signIn('credentials', {
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="w-fit m-12 flex flex-col gap-y-4">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={onChange}
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={onChange}
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
          />
        </div>

        <button type="submit">Register</button>
      </form>

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
