import z from 'zod'

export const ApiErrorResponseSchema = z.object({
  error: z.string(),
})

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>

export const isApiErrorResponse = <T extends object>(data: ApiErrorResponse | T): data is ApiErrorResponse =>
  'error' in data
