'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TypeAnimation } from 'react-type-animation';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import Image from 'next/image';
import TestImage from '../public/test.png';
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
  return (
    <div className="bg-red-300 flex items-center">
      <div className="w-1/2 flex items-center flex-col bg-white justify-center text-2xl h-screen space-y-8">
        <div className="leading-9 text-center mb-4">
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
              style={{ fontSize: '2rem', display: 'absolute', inset: 1, left: 50 }}
            />
          </div>
          <p className="text-xl text-normal">This is a login Page</p>
        </div>
        {/*SignIn Form*/}
        <form
          className="w-8/10 space-y-4 "
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn(email, password);
          }}
        >
          <div>
            <Label htmlFor="email" className="text-lg inline-block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 focus-visible:border-red-300"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-lg inline-block">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 focus-visible:border-red-300 "
            />
          </div>

          {/*Forget Password*/}
          <div className="text-sm text-end duration-200 hover:text-red-300">
            <Link href={'#'}>Forget Password?</Link>
          </div>

          {/*OAuth SignIn*/}
          <div className="flex items-center flex-col justify-center mt-7">
            <Button className="w-7/10 h-10 bg-red-500 hover:bg-red-700 duration-300 text-lg cursor-pointer">
              Sign In
            </Button>
            <Button className="mt-3 w-7/10 h-10 text-lg cursor-pointer">
              Sign In With Google <FcGoogle />
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <p className="text-sm">
            {"Don't"} hava a Account?{' '}
            <Link
              href="/signUp"
              className="w-7/10 h-10 text-red-300 cursor-pointer hover:underline hover:underline-offset-2"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div className="mx-auto">
        <Image src={TestImage} alt="test image" width={600} height={200} />
      </div>
    </div>
  );
};

export default SignIn;
