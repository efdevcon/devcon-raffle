import { isApiErrorResponse } from '@/types/api/error'
import {
  GetPassportScorerNonceResponseSchema,
  GetResponseSchema,
  SubmitAddressForScoringRequest,
  SubmitAddressForScoringResponseSchema,
} from '@/types/api/scorer'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Hex } from 'viem'
import { useAccount, useChainId, useSignMessage } from 'wagmi'

export const useSendForScoring = () => {
  const { address } = useAccount()
  const chainId = useChainId()
  const { signMessageAsync } = useSignMessage()
  const [requestSettled, setRequestSettled] = useState(false)
  const [signatureError, setSignatureError] = useState(false)

  return {
    ...useMutation({
      mutationFn: async () => {
        if (requestSettled || !address) {
          return
        }

        try {
          return await getGitcoinScore(address, chainId)
        } catch (error) {}

        const nonceData = await getGitcoinNonce()
        try {
          const signature = await signMessageAsync({ message: nonceData.message })
          await sendForScoring({ userAddress: address as Hex, signature, nonce: nonceData.nonce })
          setRequestSettled(true)
        } catch (error) {
          setSignatureError(true)
        }
      },
    }),
    requestSettled,
    signatureError,
  }
}

export const getGitcoinScore = async (userAddress: Hex, chainId: number) => {
  const result = await fetch(`/api/scorer/${userAddress}?chainId=${chainId}`)
  const data = GetResponseSchema.parse(await result.json())
  if (isApiErrorResponse(data)) throw new Error(data.error)
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
