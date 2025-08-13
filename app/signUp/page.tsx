'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import Link from 'next/link';
import Image from 'next/image';
import Test1Image from '../public/test1.png';
import { supabaseClient } from '@/server/libs/supabase-client';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export const signUpSchema = z.object({
  name: z.string().min(2, 'Please input your name at least 2 character'),
  email: z.email('Please input your email'),
  password: z
    .string()
    .min(8, 'Please input your password')
    .regex(/^(?=.*[A-Z]).{8,}$/, {
      message:
        'Should Contain at least one uppercase letter and have a minimum length of 8 characters.',
    }),
});

interface signUpProps {
  email: string;
  password: string | 'Other Provider';
  name: string;
  uuid?: string | null;
  provider?: string | undefined;
}

const SignUp = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const route = useRouter();

  const handleSignUp = async (data: z.infer<typeof signUpSchema>) => {
    const { email, password, name } = data;
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
        await postData({
          email,
          password,
          name,
          uuid: data.user?.id,
          provider: data.user?.app_metadata.provider,
        });
        route.push('/');
      }
    } catch (error) {
      console.log('sign in error ->', error);
    }
  };
  const postData = async ({
    email,
    password,
    name,
    uuid,
    provider,
  }: signUpProps) => {
    console.log(email, password, name, uuid, provider);
    try {
      const { data } = await axios.post('http://localhost:3001/api/users', {
        email,
        password,
        name,
        uuid,
        provider,
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
          <p className="text-3xl font-extrabold">Sign Up Page</p>
        </div>
        {/*SignIn Form*/}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => handleSignUp(data))}
            className="w-5/6 space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="text-xl font-semibold">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      className="mt-2 w-full focus-visible:border-red-300"
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="text-xl font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Email"
                      className="mt-2 w-full focus-visible:border-red-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="password"
                    className="text-xl font-semibold"
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-2 w-full focus-visible:border-red-300"
                      id="password"
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer bg-red-500 text-lg duration-300 hover:bg-red-700"
            >
              Sign Up
            </Button>
          </form>
        </Form>
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
