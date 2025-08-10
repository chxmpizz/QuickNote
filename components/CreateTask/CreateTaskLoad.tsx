import React from 'react';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

const CreateTaskLoad = () => {
  return (
    <div>
      <div className="w-full overflow-hidden px-2">
        <Card className="mx-auto w-full border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold">
              <Skeleton className="h-10 w-1/5"></Skeleton>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Skeleton className="h-7 w-1/9"></Skeleton>
              <Skeleton className="h-8 w-full"></Skeleton>
            </div>
            <div className="space-y-3">
              <Skeleton className="h-7 w-1/9"></Skeleton>
              <Skeleton className="h-8 w-full"></Skeleton>
            </div>
            <div className="space-y-3">
              <Skeleton className="h-7 w-1/9"></Skeleton>
              <Skeleton className="h-103 w-full"></Skeleton>
            </div>
            <Skeleton className="h-9 w-1/11"></Skeleton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTaskLoad;
