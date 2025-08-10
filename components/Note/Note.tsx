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
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import axios from 'axios';

// Define the props for the Note component

interface NoteProps {
  badge: string;
  title: string;
  content: string;
}

const Note = ({ badge, title, content }: NoteProps) => {
  const [isEdit, setIsEdit] = useState(false);
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
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardAction className="mt-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="h-full w-full">
                <Badge className={`cursor-pointer`}>{badge}</Badge>
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
          <Button
            className="cursor-pointer bg-[#6B4EFF] duration-200 hover:bg-[#464063]"
            onClick={() => setIsEdit(!isEdit)}
          >
            Edit
          </Button>
        </CardFooter>
      </Card>
      {isEdit && <div>something</div>}
    </div>
  );
};

export default Note;
