import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
  //   CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

const NoteLoad = () => {
  return (
    <div className="relative inline w-auto max-w-1/3">
      <Card>
        <CardHeader className="">
          <CardTitle>
            <Skeleton className="h-7 w-full text-2xl font-bold"></Skeleton>
          </CardTitle>
          <CardAction>
            <Skeleton className="h-7 w-10"></Skeleton>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-25 w-full"></Skeleton>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-16"></Skeleton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoteLoad;
