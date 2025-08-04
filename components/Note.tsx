import React from 'react';

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
  // DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import ColorPicker from './ColorPick';

interface NoteProps {
  badge: string;
  title: string;
  content: string;
}
const Note = ({ badge, title, content }: NoteProps) => {
  return (
    <div className="inline w-auto max-w-1/3">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger className="h-full w-full">
                <Badge className="cursor-pointer">{badge}</Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-none">
                <DropdownMenuLabel>Tags</DropdownMenuLabel>
                <ColorPicker />
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        <CardContent className="line-clamp-6">
          <p>{content}</p>
        </CardContent>
        <CardFooter>
          <Button>Edit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Note;
