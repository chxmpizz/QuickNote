import { Elysia } from 'elysia';
import { supabaseClient } from '../libs/supabase-client';
// import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

interface userProps {
  email: string;
  password: string;
  name: string;
  img?: string;
  uuid: string;
  provider: string;
}

export const userRoutes = (app: Elysia) => {
  // GET users
  app.get('/api/users', async () => {
    const { data, error } = await supabaseClient.from('users').select('*');
    if (error) return { error: error.message };
    return data;
  });

  // POST user
  app.post('/api/users', async ({ body }: { body: userProps }) => {
    const { email, password, name, provider, uuid } = body;

    // const uuid = uuidv4();
    // console.log(uuid);
    const passwordHash = await bcrypt.hash(password, 10);

    const { error } = await supabaseClient.from('users').insert({
      uuid,
      email,
      password: passwordHash,
      name,
      provider,
    });

    if (error) return { error: error.message };
    return { message: 'User created', uuid };
  });

  app.put('/api/users/:id', async ({ body, params }) => {
    const { email, password, name } = body as userProps;
    const updateData: Record<string, unknown> = {
      email,
      name,
    };
    try {
      if (password) {
        updateData.password = await bcrypt.hash(password, password.length);
      }
      const res = await supabaseClient
        .from('users')
        .update(updateData)
        .eq('id', params.id);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log('error select users -> ', error);
    }
  });
};
