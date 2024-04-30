import z from 'zod'
import { EthereumAddressSchema } from '../EthereumAddress'

export const PassportAnalysisResponseSchema = z.object({
  address: EthereumAddressSchema,
  details: z.object({
    models: z.object({
      ethereum_activity: z.object({
        score: z.number().min(0).max(100),
      }),
    }),
  }),
})

export type PassportAnalysisResponse = z.infer<typeof PassportAnalysisResponseSchema>
