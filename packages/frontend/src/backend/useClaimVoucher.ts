import { useMutation } from '@tanstack/react-query'
import { GetVoucherNonceResponseSchema, GetVoucherResponseSchema, GetVoucherWithSigRequest } from '@/types/api/voucher'
import { isApiErrorResponse } from '@/types/api/error'
import { buildVoucherClaimMessage } from '@/utils/buildVoucherClaimMessage'
import { useAccount, useChainId, useSignMessage } from 'wagmi'

export const useClaimVoucher = (setVoucher: (voucher: string) => void) => {
  const { address } = useAccount()
  const chainId = useChainId()
  const { signMessageAsync } = useSignMessage()

  return useMutation({
    mutationFn: async () => {
      if (!address) throw new Error('Wallet not connected')
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
  const voucherResponse = GetVoucherResponseSchema.parse(await voucherFetchResponse.json())
  if (isApiErrorResponse(voucherResponse)) throw new Error(voucherResponse.error)

  return voucherResponse.voucherCode
}
