'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'

import Link from 'next/link';
import Image from 'next/image';
import Test1Image from '../public/test1.png';
import { supabaseClient } from '@/server/libs/supabase-client';
import { useRouter } from 'next/navigation';

interface signUpProps {
  email : string,
  password : string,
  name : string
}

const SignUp = () => {
  const route = useRouter()
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
        route.push('/')
      }
      
    } catch (error) {
      console.log('sign in error ->', error);
    }
    await postData({ email, password, name });
  };
  const postData = async ({email , password , name } : signUpProps) => {
    try {
      const {data} = await axios.post('http://localhost:3001/api/users' , {
        email , password , name
      })
      if (data) {
        console.log(data)
      }

    } catch (error) {
      console.log('fetch user data error ->' ,error)
    }
  }
return (
    <div className="bg-red-300 flex items-center">
      <div className="mx-auto">
        <Image src={Test1Image} alt="test image" width={600} height={200} />
      </div>
      <div className="w-1/2 flex items-center flex-col bg-white justify-center text-2xl h-screen space-y-8">
        <div className="leading-9 text-center mb-4">
          <p className="text-3xl text-normal">Sign Up Page</p>
        </div>
        {/*SignIn Form*/}
        <form
          className="w-8/10 space-y-4 "
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp({email, password, name});
          }}
        >
          <div>
            <Label htmlFor="email" className="text-lg inline-block">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 focus-visible:border-red-300"
            />
          </div>
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

          {/*Sign Up*/}
          <div className="flex items-center flex-col justify-center mt-7">
            <Button
              type="submit"
              className="w-7/10 h-10 bg-red-500 hover:bg-red-700 duration-300 text-lg cursor-pointer"
            >
              Sign Up
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <p className="text-sm">
            <Link
              href="/"
              className="w-7/10 h-10 text-red-300 cursor-pointer hover:underline hover:underline-offset-2"
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
