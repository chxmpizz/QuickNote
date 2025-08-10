'use client';
import { useEffect, useState } from 'react';
import CreateTask from '@/components/CreateTask/CreateTask';
import CreateTaskLoad from '@/components/CreateTask/CreateTaskLoad';
const Page = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return <div>{loading ? <CreateTaskLoad /> : <CreateTask />}</div>;
};

export default Page;
