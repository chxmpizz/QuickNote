'use client';
import { useEffect, useState } from 'react';
import SignIn from './signIn/page';
import { supabaseClient } from '@/server/libs/supabase-client';
import Home from './pages/Home';
import Navbar from '@/components/Navbar';
import type { Session } from '@supabase/supabase-js';

const Page = () => {
  const [session, setSession] = useState<Session | null>(null);
  const fetchSession = async () => {
    try {
      const currentSession = await supabaseClient.auth.getSession();
      setSession(currentSession.data.session);
      console.log((currentSession.data.session))
      console.log((currentSession.data.session?.user))
    } catch (error) {
      console.log('session error -> ', error);
    }
  };
  useEffect(() => {
    fetchSession();
    const { data: authListen } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListen.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      {session? (
        <div className='flex'>
          <Navbar />
          <div>
            <Home />
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Page;
