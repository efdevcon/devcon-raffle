import { toast } from 'sonner'

export async function handleBackendRequest<ReturnType>(promise: Promise<ReturnType>) {
  toast.promise(promise, { error: handleError })
  return promise.catch(() => undefined)
}

function handleError(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }
  return 'Unknown error.'
}
