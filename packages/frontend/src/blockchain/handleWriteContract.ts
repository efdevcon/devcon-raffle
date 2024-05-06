import { toast } from 'sonner'
import { BaseError as WagmiBaseError } from 'wagmi'
import { BaseError as ViemBaseError, Hex } from 'viem'

export const handleWriteContract = async (promise: Promise<Hex>) => {
  toast.promise(promise, {
    loading: 'Sending transaction...',
    success: (data) => `Transaction hash: ${data}`,
    error: (error) => getWagmiErrorMessage(error),
  })
  return promise.catch(() => undefined)
}

function getWagmiErrorMessage(error: unknown) {
  if (error instanceof ViemBaseError || error instanceof WagmiBaseError) {
    return error.shortMessage
  }
  if (error instanceof Error) {
    return error.message
  }
  return error ? 'Unknown Error' : undefined
}
