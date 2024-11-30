import {z} from 'zod'

export const createUserSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    phoneNumber: z.string().optional(),
});

export type ICreateUserDto = z.infer<typeof createUserSchema>;