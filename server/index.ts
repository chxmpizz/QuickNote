import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { supabaseClient } from './libs/supabase-client';

const app = new Elysia();

interface taskProps {
  title: string;
  content: string;
  tags: string;
  user_id?: number;
}
interface userProps {
  email: string;
  password: string;
  name: string;
}

app.use(cors());

app.get('/api/users', async () => {
  try {
    const res = await supabaseClient.from('users').select();
    return res.data;
  } catch (error) {
    console.log('error select users -> ', error);
  }
});
app.post('/api/users', async ({ body }: { body: userProps }) => {
  const { email, password, name } = body;
  try {
    const res = await supabaseClient.from('users').insert({
      email,
      password,
      name,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log('error select users -> ', error);
  }
});
app.put('/api/users/:id', async ({ body }: { body: userProps }) => {
  const { email, password, name } = body;
  try {
    const res = await supabaseClient.from('users').insert({
      email,
      password,
      name,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log('error select users -> ', error);
  }
});

app.post('/api/task', async ({ body }: { body: taskProps }) => {
  const { title, content, tags } = body;
  try {
    const res = await supabaseClient.from('tasks').insert({
      title,
      content,
      tags,
    });
    console.log('Task created successfully:', res.data);
    return res.data;
  } catch (error) {
    console.log('error add task -> ', error);
  }
});

app.put(
  '/api/task/:id',
  async ({ body, params }: { body: taskProps; params: { id: number } }) => {
    const { title, content, tags } = body;
    const { id } = params;
    try {
      const res = await supabaseClient
        .from('tasks')
        .update({
          title,
          content,
          tags,
        })
        .eq('id', id)
        .select()
        .single();
      return res.data;
    } catch (error) {
      console.log('error add task -> ', error);
    }
  },
);

app.get('/api/task', async () => {
  try {
    const res = await supabaseClient.from('tasks').select();
    return res;
  } catch (error) {
    console.log('error select all task -> ', error);
  }
});

app.listen(3001);

console.log('Elysia is running from server/index.ts');
