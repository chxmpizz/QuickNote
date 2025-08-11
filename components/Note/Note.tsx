import React, { useEffect, useState } from 'react';

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

// Define the props for the Note component

interface NoteProps {
  badge: string;
  title: string;
  content: string;
  id: number;
}
const taskEditSchema = z.object({
  title: z
    .string()
    .min(2, 'Character must have at least 2 characters')
    .max(100),
  content: z.string(),
});

const Note = ({ badge, title, content, id }: NoteProps) => {
  const form = useForm<z.infer<typeof taskEditSchema>>({
    resolver: zodResolver(taskEditSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });
  interface Tag {
    id: number;
    tags: string;
  }

  const [tags, setTags] = useState<Tag[]>([]);
  const changeTags = async ({ tags, id }: Tag) => {
    console.log('tags -> ', tags, id);
    try {
      await axios.put(`http://localhost:3001/api/task/${id}`, {
        tags,
      });
    } catch (error) {
      console.log('error on changeTags -> ', error);
    }
  };
  const taskEdit = async ({
    data,
    id,
  }: {
    data: z.infer<typeof taskEditSchema>;
    id: number;
  }) => {
    console.log('data -> ', data, id);
    try {
      await axios.put(`http://localhost:3001/api/task/${id + 1}`, {
        title: data.title,
        content: data.content,
      });
    } catch (error) {
      console.log('error on changeTags -> ', error);
    }
  };
  const tagsFetch = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/task');
      setTags(res.data.data);
    } catch (error) {
      console.log('error on tagsFetch -> ', error);
    }
  };
  useEffect(() => {
    tagsFetch();
  }, []);
  return (
    <div className="relative inline w-auto max-w-1/3">
      <Card>
        <CardHeader>
          <CardTitle className="line-clamp-1 text-2xl font-bold">
            {title}
          </CardTitle>
          <CardAction className="mt-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="h-full w-full">
                <Badge className={`line-clamp-1 cursor-pointer`}>{badge}</Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-none">
                <DropdownMenuLabel className="text-xl font-semibold">
                  Tags
                </DropdownMenuLabel>
                {tags.map((items, idx) => {
                  return (
                    <div key={idx}>
                      <DropdownMenuItem
                        onClick={() =>
                          changeTags({ id: idx, tags: items.tags })
                        }
                      >
                        {items.tags}
                      </DropdownMenuItem>
                    </div>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        <CardContent className="text-md line-clamp-6">
          <p>{content}</p>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger className="text-md cursor-pointer rounded-md bg-[#6B4EFF] px-5 py-1.5 text-white duration-200 hover:bg-[#464063]">
              Edit
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">
                  Edit Task
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => taskEdit({ data, id }))}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="title"
                          className="text-md font-semibold"
                        >
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder={title} {...field} />
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
                          className="text-md font-semibold"
                        >
                          Content
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={content}
                            className="h-100"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="text-md cursor-pointer rounded-md bg-[#6B4EFF] px-5 py-1.5 text-white duration-200 hover:bg-[#464063]"
                  >
                    Save
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Note;
