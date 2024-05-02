import { useMutation } from '@tanstack/react-query'
import { GetVoucherNonceResponseSchema, GetVoucherResponseSchema, GetVoucherWithSigRequest } from '@/types/api/voucher'
import { isApiErrorResponse } from '@/types/api/error'
import { buildVoucherClaimMessage } from '@/utils/buildVoucherClaimMessage'
import { useAccount, useChainId, useSignMessage } from 'wagmi'
import { voucherCodeJwt } from '@/constants/jwt'

export const useClaimVoucher = (setVoucher: (voucher: string) => void) => {
  const { address } = useAccount()
  const chainId = useChainId()
  const { signMessageAsync } = useSignMessage()

  return useMutation({
    mutationFn: async () => {
      if (!address) throw new Error('Wallet not connected')
      if (getVoucherCodeJwt()) {
        return await getVoucherCodeUsingJwt()
      }

      const nonce = await getVoucherNonce()
      const signature = await signMessageAsync({ message: buildVoucherClaimMessage(chainId, address, nonce) })
      return await getVoucherCode({
        nonce: nonce,
        chainId,
        signature,
        userAddress: address,
      })
    },
    onSuccess: setVoucher,
  })
}

const getVoucherNonce = async (): Promise<string> => {
  const response = await fetch('/api/voucher/nonce')
  const data = GetVoucherNonceResponseSchema.parse(await response.json())
  if (isApiErrorResponse(data)) throw new Error(data.error)

  return data.nonce
}

const getVoucherCode = async (requestData: GetVoucherWithSigRequest): Promise<string> => {
  const voucherFetchResponse = await fetch('/api/voucher', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
  return parseVoucherCodeResponse(await voucherFetchResponse.json())
}

const getVoucherCodeUsingJwt = async () => {
  const voucherFetchResponse = await fetch('/api/voucher')
  return parseVoucherCodeResponse(await voucherFetchResponse.json())
}

const parseVoucherCodeResponse = (response: unknown) => {
  const voucherResponse = GetVoucherResponseSchema.parse(response)
  if (isApiErrorResponse(voucherResponse)) throw new Error(voucherResponse.error)

  return voucherResponse.voucherCode
}

const getVoucherCodeJwt = () => {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=')
    if (key === voucherCodeJwt) {
      return value
    }
  }
  return undefined
}
