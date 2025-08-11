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
    try {
      const res = await supabaseClient.from('tasks').insert({
        title,
        content,
        tags,
        auth_user_id: userId,
      });
      return res.data;
    } catch (error) {
      console.log('error add task -> ', error);
    }
  });

  app.put('/api/task/:id', async ({ body, params }) => {
    const { title, content, tags } = body as taskProps;
    const updateData: Record<string, unknown> = { title, content };
    if (tags) {
      updateData.tags = tags;
    }
    const { id } = params;
    try {
      await supabaseClient.from('tasks').update(updateData).eq('id', id);
    } catch (error) {
      console.log('error add task -> ', error);
    }
  });

  app.get('/api/task', async () => {
    try {
      const res = await supabaseClient.from('tasks').select();
      return res;
    } catch (error) {
      console.log('error select all task -> ', error);
    }
  });
  app.delete('/api/task/:id', async ({ params }) => {
    console.log(params.id);
    try {
      await supabaseClient.from('tasks').delete().eq('id', params.id);
    } catch (error) {
      console.log('error with delete route task -> ', error);
    }
  });
};
