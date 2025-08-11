'use client';
import { useEffect, useState } from 'react';
import CreateTask from '@/components/CreateTask/CreateTask';
import CreateTaskLoad from '@/components/CreateTask/CreateTaskLoad';
import { supabaseClient } from '@/server/libs/supabase-client';
// import type { Session } from '@supabase/supabase-js';
const Page = () => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const fetchSession = async () => {
    try {
      const currentSession = await supabaseClient.auth.getSession();
      setUserId(currentSession.data.session?.user.id);
      console.log('session -> ', currentSession.data.session?.user.id);
    } catch (error) {
      console.log('session error -> ', error);
    }
  };
  useEffect(() => {
    fetchSession();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <div>{loading ? <CreateTaskLoad /> : <CreateTask userId={userId} />}</div>
  );
};

export default Page;
