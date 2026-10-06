import { z } from "zod"

export const userSchema = z.object({
    username: z.string().min(4),
    email: z.email(),
    password: z.string().min(8),
    role: z.enum([
        "arena_user",
        "general_user",
        "admin"
    ]),

    assignedArena: z.enum([
        "North",
        "South",
        "Center",
        "All"
    ]),
})