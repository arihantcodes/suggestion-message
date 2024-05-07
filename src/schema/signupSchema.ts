import {z } from 'zod';

export const uservalidation = z
        .string()
        .min(5, { message: 'Username must be at least 5 characters long' })
        .max(19, { message: 'Username must be at most 11 characters long' })
        .regex(/^[a-zA-Z][a-zA-Z0-9_]+$/, { message: 'Username must not contain Special letter' });

export const SignUpSchema = z.object({
    username: uservalidation,
    email:z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(7, { message: 'Password must be at least 7 characters long' }),
   
})        