'use client';
import { useEffect, useState } from 'react';
import SignIn from './(signIn)/page';
import { supabaseClient } from '@/server/libs/supabase-client';
import Note from '@/components/Note';
import Navbar from '@/components/Navbar';
import type { Session } from '@supabase/supabase-js';
import axios from 'axios';


const Page = () => {
  const [session, setSession] = useState<Session | null>(null);
  const fetchSession = async () => {
    try {
      const currentSession = await supabaseClient.auth.getSession();
      setSession(currentSession.data.session);
    } catch (error) {
      console.log('session error -> ', error);
    }
  };
  const updataProvider = async () => {
    try {
      await axios.put(`http://localhost:3001/api/users/${session?.user.id}`, {
        provider: session?.user.app_metadata.provider,
      });
    } catch (error) {
      console.log('error on updataProvider -> ', error);
    }
  };
  useEffect(() => {
    fetchSession();
    updataProvider();
    const { data: authListen } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );
    console.log(session);
    return () => {
      authListen.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      {session ? (
        <div className="w-full">
          <div className="flex">
            <Navbar
              name={session.user.user_metadata.name}
              image={session.user.user_metadata.avatar_url}
            />
          </div>
          <div className="mx-2">
            <div className="grid w-auto grid-cols-2 gap-3">
              {Array(3)
                .fill(0)
                .map((_, idx) => {
                  return (
                    <div key={idx}>
                      <Note
                        title="Something"
                        badge="Important"
                        content="This is a note content."
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Page;
