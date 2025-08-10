import React from 'react';
import { Skeleton } from '../ui/skeleton';

const NavbarLoad = () => {
  return (
    <div className="flex h-full w-full items-center justify-center py-4">
      <nav className="border-accent flex w-auto animate-pulse items-center justify-around rounded-xl border-2 bg-white px-4 py-2">
        <Skeleton className="mx-2 h-9.5 w-22 rounded-lg"></Skeleton>
        <Skeleton className="mx-2 h-9.5 w-17 rounded-lg"></Skeleton>
        <Skeleton className="mx-2 h-9.5 w-35 rounded-lg"></Skeleton>

        <div className="flex items-center">
          <Skeleton className="h-10 w-10 rounded-[100%]"></Skeleton>
        </div>
      </nav>
    </div>
  );
};

export default NavbarLoad;
