import z from 'zod'
import { EthereumAddressSchema } from '../EthereumAddress'
import { HexStringSchema } from '../HexString'
import { ApiErrorResponseSchema } from './error'

export const GetPassportScorerNonceResponseSchema = z.union([
  ApiErrorResponseSchema,
  z.object({
    message: z.string(),
    nonce: z.string(),
  }),
])

export type GetPassportScorerNonceResponse = z.infer<typeof GetPassportScorerNonceResponseSchema>

export const SubmitAddressForScoringRequestSchema = z.object({
  userAddress: z.string(),
  signature: HexStringSchema,
  nonce: z.string(),
})

export type SubmitAddressForScoringRequest = z.infer<typeof SubmitAddressForScoringRequestSchema>

export const SubmitAddressForScoringResponseSchema = z.union([ApiErrorResponseSchema, z.object({})])

export type SubmitAddressForScoringResponse = z.infer<typeof SubmitAddressForScoringResponseSchema>

const ErrorResponseSchema = z.object({
  status: z.literal('error'),
  error: z.string(),
})

const GetScoreResponseProcessingSchema = z.object({
  status: z.literal('processing'),
})

const GetScoreResponseSuccessSchema = z.object({
  status: z.literal('done'),
  address: EthereumAddressSchema,
  score: z.string().regex(/^[0-9]+$/) /** serialised bigint */,
  digest: HexStringSchema /** EIP-712 digest */,
  signature: HexStringSchema,
})

const GetResponseSchema = z.union([
  ErrorResponseSchema,
  GetScoreResponseProcessingSchema,
  GetScoreResponseSuccessSchema,
])

export type GetScoreResponse = z.infer<typeof GetResponseSchema>
