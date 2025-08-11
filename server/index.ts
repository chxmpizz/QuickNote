import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

import { userRoutes } from './routes/user';
import { taskRoutes } from './routes/task';

const app = new Elysia();

app.use(cors());
userRoutes(app);
taskRoutes(app);

app.listen(3001);

console.log('Elysia is running from server/index.ts');
