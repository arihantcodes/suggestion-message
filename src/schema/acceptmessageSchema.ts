import {z} from 'zod';

export const acceptmessageSchema = z.object({
    acceptMessages: z.boolean(),
    
})