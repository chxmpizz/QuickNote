'use client';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export const taskSchema = z.object({
  title: z.string().min(2, 'Character must have at least 2 characters').max(50),
  tags: z.string().min(2, 'Character must have at least 2 characters').max(15),
  content: z.string(),
});

const TaskCreate = ({ userId }: { userId: string | undefined }) => {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      tags: '',
      content: '',
    },
  });
  const router = useRouter();
  const submitFunction = async (data: z.infer<typeof taskSchema>) => {
    try {
      await axios.post('http://localhost:3001/api/task', {
        title: data.title,
        content: data.content,
        tags: data.tags,
        userId,
      });
      router.push('/');
      form.reset();
    } catch (error) {
      console.error('Error creating task -> ', error);
    }
    console.log('Form submitted', data);
  };
  return (
    <div className="w-full overflow-hidden px-2">
      <Card className="mx-auto w-full border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold">New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => submitFunction(data))}
              className="space-y-3"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="title"
                      className="text-xl font-semibold"
                    >
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input id="title" placeholder="Task Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="tags" className="text-xl font-semibold">
                      Tags
                    </FormLabel>
                    <FormControl>
                      <Input id="tags" placeholder="Task Tags" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="content"
                      className="text-xl font-semibold"
                    >
                      Content
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="content"
                        placeholder="Task Content"
                        className="h-105"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="cursor-pointer bg-[#6B4EFF] duration-200 hover:bg-[#464063]"
              >
                Create Task
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCreate;
