'use client';
import { useEffect, useState } from 'react';
import SignIn from './(signIn)/page';
import { supabaseClient } from '@/server/libs/supabase-client';
import Note from '@/components/Note/Note';
import Navbar from '@/components/Navbar/Navbar';
import axios from 'axios';
import { Session } from '@supabase/supabase-js';
import NoteLoad from '@/components/Note/NoteLoad';
import NavbarLoad from '@/components/Navbar/NavbarLoad';

interface Task {
  id: number;
  title: string;
  content: string;
  tags: string;
}

const Page = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    try {
      const { data, error } = await supabaseClient.auth.getSession();
      if (error) {
        console.error('Failed to get session:', error.message);
        setSession(null);
        return null;
      } else if (!error && data.session) {
        setSession(data.session);
        await fetchTasks(data.session.user.id);
      }
    } catch (error) {
      console.log('session error -> ', error);
    }
  };

  const fetchTasks = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/task/:${id}`);
      const fetchedTasks = Array.isArray(res.data.data) && res.data.data;
      setTasks(fetchedTasks || []);
    } catch (error) {
      console.log('error on fetchTasks -> ', error);
    }
  };
  useEffect(() => {
    const init = async () => {
      await fetchSession();
    };
    init();
    setLoading(true);

    const { data: authListen } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      authListen.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      {session ? (
        <div className="w-full">
          <div className="flex">
            {loading ? (
              <NavbarLoad />
            ) : (
              <Navbar
                name={session.user.user_metadata.name}
       
              />
            )}
          </div>
          <div className="mx-3 my-4">
            <div className="grid w-auto grid-cols-4 gap-3">
              {tasks.map((task, idx) => {
                return (
                  <div key={idx}>
                    {loading ? (
                      <NoteLoad />
                    ) : (
                      <Note
                        title={task.title}
                        badge={task.tags}
                        content={task.content}
                        id={task.id}
                      />
                    )}
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
