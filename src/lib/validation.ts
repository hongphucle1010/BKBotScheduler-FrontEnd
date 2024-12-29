import * as z from 'zod'

export const groupCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
  avatar: z.string().optional()
})
