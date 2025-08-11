import Elysia from 'elysia';
import { supabaseClient } from '../libs/supabase-client';

interface taskProps {
  title: string;
  content: string;
  tags: string;
  userId: string;
}

export const taskRoutes = (app: Elysia) => {
  //Task
  app.post('/api/task', async ({ body }: { body: taskProps }) => {
    const { title, content, tags, userId } = body;
    console.log('Task created successfully:', title, content, tags, userId);
    try {
      const res = await supabaseClient.from('tasks').insert({
        title,
        content,
        tags,
        auth_user_id: userId,
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
};
