import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { supabaseClient } from "@/server/libs/supabase-client"

const Navbar = () => {
  const handleLogout = async () => {
    try {
        const { error} =  await supabaseClient.auth.signOut();
        if (error) {
            console.log('error in log out handle try -> ' , error)
        }
      
    } catch (error) {
        console.log('error on log out handle -> ' , error)
    }
  }
  return (
    <div className='w-40 bg-red-200 h-screen flex flex-col py-4 justify-between items-center'>
        <div className='text-lg text-center'>
            <p className='text-xl font-extrabold '>Quick Note</p>
            <nav className='flex flex-col'>
                <Link href='#'>1</Link>
                <Link href='#'>2</Link>
                <Link href='#'>3</Link>
                <Link href='#'>4</Link>
                <Link href='#'>5</Link>
            </nav>
        </div>

        <Button onClick={() => handleLogout()}>Log Out</Button>
    </div>
  )
}

export default Navbar