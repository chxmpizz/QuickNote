'use client'
import React , {useState , useEffect} from 'react'
import axios from 'axios'
import {supabaseClient} from '../server/libs/supabase-client'

const Page = () => {
  const [msg , setMsg] = useState('');
  const [newTask , setNewTask] = useState('')

  const handleClick =  async (e : React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await supabaseClient.from('tasks').insert({})
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3002/api/hello');
        console.log(res)
        setMsg(res.data);
      } catch (error) {
        console.log('error -> ', error);
      }
    };
    fetchData();

  },[])
  return (
    <div>
      <h1>
        {msg}
      </h1>
    </div>
  )
}

export default Page