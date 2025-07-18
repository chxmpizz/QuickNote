import { Elysia } from "elysia";
import {cors} from '@elysiajs/cors'
import {supabaseClient} from './libs/supabase-client'

const app = new Elysia();

interface taskProps {
    title : string
    content : string
}

app.use(cors())

app.get("/api/users", async () => {
    try {
        const res = await supabaseClient.from('users').select()
        return res.data
    } catch (error) {
        console.log('error select users -> ' , error)
    }
});

app.post('/api/task' , async ({body} : {body : taskProps}) => {
    const {title , content} = body 
    try {
        const res = await supabaseClient.from('tasks').insert({
            title,
            content
        }).select().single()
        return (res.data)
    } catch (error) {
        console.log('error add task -> ' , error)
    }
})

app.get('/api/task' , async () => {
    try {
        const res = (await supabaseClient.from('tasks').select())
        return res
    } catch (error) {
        console.log('error select all task -> ' , error)
    }
})

app.listen(3001);

console.log("Elysia is running from server/index.ts");
