import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { supabaseClient } from '@/server/libs/supabase-client';
import {  Avatar, AvatarFallback } from '../ui/avatar';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';

import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '../ui/label';
import { usePathname } from 'next/navigation';

interface UserProps {
  name: string;
}

const Navbar = ({ name }: UserProps) => {
  const pathName = usePathname();
  const [form, setForm] = useState({
    name: '',
  });
  const handleLogout = async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        console.log('error in log out handle try -> ', error);
      }
    } catch (error) {
      console.log('error on log out handle -> ', error);
    }
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabaseClient.auth.updateUser({
        data: {
          name: form.name,
        },
      });
    } catch (error) {
      console.log('error on handleForm -> ', error);
    }
  };
  return (
    <div className="flex h-full w-full items-center justify-center py-4">
      <nav
        className={`flex w-auto items-center justify-around rounded-xl border-2 border-[#6B4EFF] bg-white px-4 py-2`}
      >
        <Link
          href="#"
          className={`mx-2 rounded-lg px-2 py-1 shadow-[0px_2px_10px_1px_#e5e5e5] transition duration-150 ${pathName === '/' ? 'bg-[#6B4EFF] text-white' : 'bg-neutral-200 text-[#2A2251] hover:bg-[#6B4EFF] hover:text-white'} `}
        >
          <FontAwesomeIcon icon={faNoteSticky} /> All Task
        </Link>

        <Link
          href="/create"
          className={`mx-2 rounded-lg px-2 py-1 shadow-[0px_2px_10px_1px_#e5e5e5] transition duration-150 ${pathName === '/create' ? 'bg-[#6B4EFF] text-white' : 'bg-neutral-200 text-[#2A2251] hover:bg-[#6B4EFF] hover:text-white'} `}
        >
          <FontAwesomeIcon icon={faPlus} /> Add new Tasks
        </Link>

        <div className="flex items-center">
          <Popover>
            <PopoverTrigger className="cursor-pointer">
              {' '}
              <Avatar className="h-10 w-10">
                <AvatarFallback className="text-center text-xl font-bold text-[#6B4EFF]">
                  {name[0]}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="flex items-center justify-between">
              {' '}
              <div className="flex text-[#2A2251]">
                <h1 className="mr-2 text-xl font-bold">
                  {name.toUpperCase().split(' ')[0]}
                </h1>
                <Dialog>
                  <DialogTrigger className="cursor-pointer">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="mb-2">Profile Edit</DialogTitle>
                      <form className="space-y-3" onSubmit={handleForm}>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder={name}
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                        />

                        <div className="mt-2 flex items-center justify-center">
                          <Button
                            type="submit"
                            className="w-1/3 bg-[#6B4EFF] font-semibold"
                          >
                            Save
                          </Button>
                        </div>
                      </form>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <Button
                onClick={() => handleLogout()}
                className="cursor-pointer bg-[#6B4EFF] font-semibold transition duration-200 hover:bg-[#594e8b]"
              >
                Log Out
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
