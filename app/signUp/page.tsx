'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import Link from 'next/link';
import Image from 'next/image';
import Test1Image from '../public/test1.png';
import { supabaseClient } from '@/server/libs/supabase-client';
import { useRouter } from 'next/navigation';

interface signUpProps {
  email: string;
  password: string;
  name: string;
}

const SignUp = () => {
  const route = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = async ({ email, password, name }: signUpProps) => {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (error) {
        console.error('Sign up error:', error.message);
      } else {
        console.log('User signed up successfully:', data.user);
        route.push('/');
      }
    } catch (error) {
      console.log('sign in error ->', error);
    }
    await postData({ email, password, name });
  };
  const postData = async ({ email, password, name }: signUpProps) => {
    try {
      const { data } = await axios.post('http://localhost:3001/api/users', {
        email,
        password,
        name,
      });
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log('fetch user data error ->', error);
    }
  };
  return (
    <div className="flex items-center bg-red-300">
      <div className="mx-auto">
        <Image src={Test1Image} alt="test image" width={600} height={200} />
      </div>
      <div className="flex h-screen w-1/2 flex-col items-center justify-center space-y-8 bg-white text-2xl">
        <div className="mb-4 text-center leading-9">
          <p className="text-normal text-3xl">Sign Up Page</p>
        </div>
        {/*SignIn Form*/}
        <form
          className="w-8/10 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp({ email, password, name });
          }}
        >
          <div>
            <Label htmlFor="email" className="inline-block text-lg">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full focus-visible:border-red-300"
            />
          </div>
          <div>
            <Label htmlFor="email" className="inline-block text-lg">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full focus-visible:border-red-300"
            />
          </div>
          <div>
            <Label htmlFor="password" className="inline-block text-lg">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full focus-visible:border-red-300"
            />
          </div>
          <div>
            <Label htmlFor="password" className="inline-block text-lg">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full focus-visible:border-red-300"
            />
          </div>

          {/*Sign Up*/}
          <div className="mt-7 flex flex-col items-center justify-center">
            <Button
              type="submit"
              className="h-10 w-7/10 cursor-pointer bg-red-500 text-lg duration-300 hover:bg-red-700"
            >
              Sign Up
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <p className="text-sm">
            <Link
              href="/"
              className="h-10 w-7/10 cursor-pointer text-red-300 hover:underline hover:underline-offset-2"
            >
              <FontAwesomeIcon icon={faChevronLeft} /> Already Sign Up?{' '}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
