import { z } from "zod"

export const alertSchema = z.object({
    displayName: z.string().min(3),
    description: z.string().min(10),

    priority: z.enum([
        "Low",
        "Medium",
        "High",
        "Critical"
    ]),

    arena: z.enum([
        "North",
        "South",
        "Center"
    ]),

    status: z.enum([
        "Active",
        "Handled"
    ]),

    lon: z.number(),
    lat: z.number()
})