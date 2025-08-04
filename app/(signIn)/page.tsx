'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TypeAnimation } from 'react-type-animation';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import Image from 'next/image';
import Diary from '../public/Diary.png';
import { supabaseClient } from '@/server/libs/supabase-client';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = async (email: string, password: string) => {
    try {
      const data = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      console.log(data);
    } catch (error) {
      console.log('sign in error ->', error);
    }
  };
  const googleHandler = async () => {
    try {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
      });
      await supabaseClient.from('users').insert({
        name : data
      })
      if (error) {
        console.log('error in OAuth -> ', error);
      } else {
        console.log('data from Google OAuth -> ', data);
      }
    } catch (error) {
      console.log('error from handler ->', error);
    }
  };
  return (
    <div className="flex items-center bg-red-300">
      <div className="flex h-screen w-1/2 flex-col items-center justify-center space-y-8 bg-white text-2xl">
        <div className="mb-4 text-center leading-9">
          <div className="relative">
            <TypeAnimation
              sequence={[
                'Hello Everyone 🌍', // พิมพ์ข้อความนี้
                1000, // พัก 1 วินาที
                'Welcome to 👋',
                1000,
                'QUICKNOTE APP!💻',
                1000,
                '',
                500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{
                fontSize: '2rem',
                display: 'absolute',
                inset: 1,
                left: 50,
              }}
            />
          </div>
          <p className="text-normal text-xl">This is a login Page</p>
        </div>
        {/*SignIn Form*/}
        <form
          className="w-8/10 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn(email, password);
          }}
        >
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

          {/*Forget Password*/}
          <div className="text-end text-sm duration-200 hover:text-red-300">
            <Link href={'#'}>Forget Password?</Link>
          </div>

          {/*OAuth SignIn*/}
          <div className="mt-7 flex flex-col items-center justify-center">
            <Button className="h-10 w-7/10 cursor-pointer bg-red-500 text-lg duration-300 hover:bg-red-700">
              Sign In
            </Button>
            <Button
              className="mt-3 h-10 w-7/10 cursor-pointer text-lg"
              onClick={googleHandler}
            >
              Sign In With Google <FcGoogle />
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <p className="text-sm">
            {"Don't"} hava a Account?{' '}
            <Link
              href="/signUp"
              className="h-10 w-7/10 cursor-pointer text-red-300 hover:underline hover:underline-offset-2"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div className="mx-auto">
        <Image src={Diary} alt="test image" width={600} height={200} />
      </div>
    </div>
  );
};

export default SignIn;
