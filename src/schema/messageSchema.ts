import {z} from 'zod';


export const messageSchema = z.object({
    content: z
    .string()
    .min(10,{message:'Content must be at least 10 characters long'})
    .max(350,{message:'Content must be at most 350 characters long'}),
    
})