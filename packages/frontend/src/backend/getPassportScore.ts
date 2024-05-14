import { isApiErrorResponse } from '@/types/api/error'
import {
  GetPassportScorerNonceResponseSchema,
  GetResponseSchema,
  SubmitAddressForScoringRequest,
  SubmitAddressForScoringResponseSchema,
} from '@/types/api/scorer'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { Hex } from 'viem'
import { useAccount, useChainId, useSignMessage } from 'wagmi'
import { handleBackendRequest } from './handleBackendRequest'

export const useRequestScore = () => {
  const { address } = useAccount()
  const chainId = useChainId()
  const { signMessageAsync } = useSignMessage()

  const { mutateAsync, isSuccess, isError } = useMutation({
    mutationFn: async (shouldRefresh?: boolean) => {
      if (!address) {
        throw new Error('No address')
      }

      if (!shouldRefresh) {
        try {
          return await getGitcoinScore(address, chainId)
        } catch (error) {
          if (!(error instanceof ErrorWithStatus) || error.status != 404) {
            throw error
          }
        }
      }

      const nonceData = await getGitcoinNonce()
      const signature = await signMessageAsync({ message: nonceData.message })
      await sendForScoring({ userAddress: address as Hex, signature, nonce: nonceData.nonce })
    },
  })
  const requestScore = useCallback(
    (shouldRefresh?: boolean) => handleBackendRequest(mutateAsync(shouldRefresh)),
    [mutateAsync],
  )
  return { requestScore, isSuccess, isError }
}

class ErrorWithStatus extends Error {
  constructor(message: string, public status: number) {
    super(message)
  }
}

export const getGitcoinScore = async (userAddress: Hex, chainId: number) => {
  const result = await fetch(`/api/scorer/${userAddress}?chainId=${chainId}`)
  const data = GetResponseSchema.parse(await result.json())
  if (isApiErrorResponse(data)) throw new ErrorWithStatus(data.error, result.status)
  return data
}

const getGitcoinNonce = async () => {
  const response = await fetch(`/api/scorer/nonce`)
  const data = GetPassportScorerNonceResponseSchema.parse(await response.json())
  if (isApiErrorResponse(data)) throw new Error(data.error)
  return data
}

const sendForScoring = async (requestData: SubmitAddressForScoringRequest) => {
  const response = await fetch(`/api/scorer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
  const data = SubmitAddressForScoringResponseSchema.parse(await response.json())
  if (isApiErrorResponse(data)) throw new Error(data.error)
}
