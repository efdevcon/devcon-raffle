import z from 'zod'

// /registry/v2/score/{scorer_id}/{address}
export const RetrievePassportScoreResponseSchema = z.union([
  z.object({
    address: z.string(),
    score: z.string(),
    status: z.union([z.literal('PROCESSING'), z.literal('BULK_PROCESSING'), z.literal('DONE')]),
    last_score_timestamp: z.string(),
    evidence: z
      .object({
        type: z.string(),
        success: z.boolean(),
        rawScore: z.number(),
        threshold: z.number(),
      })
      .nullable(),
    error: z.null(),
    stamp_scores: z.record(z.number()),
  }),
  z.object({
    status: z.literal('ERROR'),
    error: z.string(),
  }),
])

export type RetrievePassportScoreResponse = z.infer<typeof RetrievePassportScoreResponseSchema>
