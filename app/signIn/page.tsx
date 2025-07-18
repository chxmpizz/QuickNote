import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

const SignIn = () => {
  const handleSignIn = () => {
    return;
  };
  return (
    <div className="bg-red-300">
      <div className="w-1/2 flex items-center flex-col bg-white justify-center text-2xl h-screen space-y-8">
        <div className="leading-9 text-center mb-4">
          <h1 className="font-bold text-4xl">Welcome Back!!</h1>
          <p className="text-xl text-normal">This is a login Page</p>
        </div>
        <form className="w-8/10 space-y-4 " action="">
          <div>
            <Label htmlFor="email" className="text-lg">
              Email
            </Label>
            <Input id="email" type="email" placeholder="Email" className="w-full mt-2 focus:ring-0" />
          </div>
          <div>
            <Label htmlFor="password" className="text-lg">
              Password
            </Label>
            <Input id="password" type="password" placeholder="Password" className="w-full mt-2" />
          </div>
          <div className="flex items-center flex-col justify-center mt-7">
            <Button
              onSubmit={handleSignIn}
              className="w-7/10 h-10 bg-red-500 hover:bg-red-700 duration-300 text-lg cursor-pointer"
            >
              Sign In
            </Button>
            <Button onSubmit={handleSignIn} className="mt-3 w-7/10 h-10 text-lg cursor-pointer">
             Sign In With Google <FcGoogle />
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <p className="text-sm">
            {"Don't"} hava a Account?{' '}
            <Link
              href="/signUp"
              onSubmit={handleSignIn}
              className="w-7/10 h-10 text-red-300 cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
