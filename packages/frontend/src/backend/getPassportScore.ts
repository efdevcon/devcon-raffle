import { isApiErrorResponse } from '@/types/api/error'
import {
  GetPassportScorerNonceResponseSchema,
  GetResponseSchema,
  GetScoreResponse,
  SubmitAddressForScoringRequest,
  SubmitAddressForScoringResponseSchema,
} from '@/types/api/scorer'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { Hex } from 'viem'
import { useAccount, useChainId, useSignMessage } from 'wagmi'
import { handleBackendRequest } from './handleBackendRequest'

export const useRequestScore = (onSuccess: (data: GetScoreResponse | undefined) => void) => {
  const { address } = useAccount()
  const chainId = useChainId()
  const { signMessageAsync } = useSignMessage()

  const { mutateAsync, isSuccess, isError, reset } = useMutation({
    mutationFn: async (isRecalculating: boolean) => {
      if (!address) {
        throw new Error('No address')
      }

      try {
        if (!isRecalculating) {
          return await getGitcoinScore(address, chainId)
        }
      } catch (error) {
        if (!(error instanceof ErrorWithStatus) || error.status != 404) {
          throw error
        }
      }

      const nonceData = await getGitcoinNonce()
      const signature = await signMessageAsync({ message: nonceData.message })
      await sendForScoring({ userAddress: address as Hex, signature, nonce: nonceData.nonce })
    },
    onSuccess,
  })
  const requestScore = useCallback(
    (isRecalculating: boolean = false) => handleBackendRequest(mutateAsync(isRecalculating)),
    [mutateAsync],
  )
  return { requestScore, isSuccess, isError, reset }
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
