import z from 'zod'

export const ApiErrorResponseSchema = z.object({
  error: z.string(),
})

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>
