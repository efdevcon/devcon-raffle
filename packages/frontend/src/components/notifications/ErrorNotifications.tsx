import * as ToastPrimitive from '@radix-ui/react-toast'
import styled from 'styled-components'
import { NotificationToast } from '@/components/notifications/NotificationToast'

interface Props {
  error: Error | undefined
  reset: () => void
  onClick: () => Promise<void> | void
}

export const ErrorNotifications = ({ error, reset, onClick }: Props) => {
  return (
    <ToastPrimitive.Provider>
      {error && <NotificationToast message={error.message} reset={reset} onClick={onClick} />}
      <NotificationsList />
    </ToastPrimitive.Provider>
  )
}

export const NotificationsList = styled(ToastPrimitive.Viewport)`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  position: absolute;
  top: 24px;
  right: 68px;
  margin: 0;
  padding: 0;
  z-index: 10;
  transition: all 0.25s ease;
`
