import * as z from 'zod'

export const groupCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
  avatar: z.string().optional()
})

export const eventSchema = z.object({
  summary: z.string().min(1, 'Summary is required'),
  description: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  isRecurring: z.boolean(),
  isComplete: z.boolean(),
  type: z.string(),
  priority: z.number().min(1).max(5),
  eventId: z.string().optional()
})

export type EventFormData = z.infer<typeof eventSchema>
