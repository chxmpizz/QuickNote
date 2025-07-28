import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { supabaseClient } from '@/server/libs/supabase-client';
import { AvatarImage, Avatar, AvatarFallback } from './ui/avatar';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from './ui/label';

interface UserProps {
  name: string;
  image: string;
}

const Navbar = ({ name, image }: UserProps) => {
  const [form , setForm] = useState('')
 
  const handleLogout = async () => {''
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        console.log('error in log out handle try -> ', error);
      }
    } catch (error) {
      console.log('error on log out handle -> ', error);
    }
  };
  return (
    <div className="flex h-full w-full items-center justify-center py-4">
      <nav className="flex w-auto items-center justify-around rounded-xl border-2  bg-white px-4 py-2">
        <Link
          href="#"
          className="mx-2 rounded-lg bg-neutral-200 px-2 py-1 text-[#2A2251] shadow-[0px_2px_10px_1px_#e5e5e5] transition duration-150 hover:bg-[#6B4EFF] hover:text-white"
        >
          <FontAwesomeIcon icon={faNoteSticky} /> All Task
        </Link>
        <Link
          href="#"
          className="mx-2 rounded-lg bg-neutral-200 px-2 py-1 text-[#2A2251] shadow-[0px_2px_10px_1px_#e5e5e5] transition duration-150 hover:bg-[#6B4EFF] hover:text-white"
        >
          <FontAwesomeIcon icon={faTags} /> Tags
        </Link>
        <Link
          href="#"
          className="mx-2 rounded-lg bg-neutral-200 px-2 py-1 text-[#2A2251] shadow-[0px_2px_10px_1px_#e5e5e5] transition duration-150 hover:bg-[#6B4EFF] hover:text-white"
        >
          <FontAwesomeIcon icon={faPlus} /> Add new Tasks
        </Link>

        <div className="flex items-center">
          <Popover>
            <PopoverTrigger className='cursor-pointer'>
              {' '}
              <Avatar className="h-10 w-10">
                <AvatarImage src={image} />
                <AvatarFallback className="text-center">{name[0]}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="flex items-center justify-between">
              {' '}
              <div className='flex text-[#2A2251]'>
                <h1 className="text-xl font-bold mr-2">{name.toUpperCase()}</h1>
                <Dialog >
                  <DialogTrigger className='cursor-pointer'>
                    <FontAwesomeIcon icon={faPenToSquare}/>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Profile Edit</DialogTitle>
                      <DialogDescription>
                        <div className='space-y-2'>
                 
                        <Label htmlFor='name' >Name</Label>
                        <Input id="name" type='text' placeholder={name} value={form} onChange={(e) => setForm(e.target.value)}/>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <Button onClick={() => handleLogout()} className='bg-[#6B4EFF] font-semibold transition duration-200 cursor-pointer hover:bg-[#594e8b]'>Log Out</Button>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
