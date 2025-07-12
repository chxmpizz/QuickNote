import { Elysia } from "elysia";
import {cors} from '@elysiajs/cors'
import {supabaseClient} from './libs/supabase-client'

const app = new Elysia();
app.use(cors())

app.get("/api/hello", () => "Hello Champ NAJA");

app.listen(3002);

console.log("Elysia is running from server/index.ts");
