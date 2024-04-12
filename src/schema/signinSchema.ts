import {z} from 'zod';

export const SigninSchema = z.object({
    identifier: z.string(),
    password:z.string()
    
})