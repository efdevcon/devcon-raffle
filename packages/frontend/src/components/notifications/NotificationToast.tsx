import * as ToastPrimitive from '@radix-ui/react-toast'
import styled from 'styled-components'
import { ErrorIcon } from '@/components/icons/ErrorIcon'
import { Colors } from '@/styles/colors'
import { CrossIcon } from '@/components/icons'

interface Props {
  message: string
  reset: () => void
  onClick: () => Promise<void> | void
}

export const NotificationToast = ({ message, reset, onClick }: Props) => {
  return (
    <Toast duration={5000}>
      <NotificationIconWrapper>
        <ErrorIcon color={Colors.Red} size={24} />
      </NotificationIconWrapper>
      <ToastContent>
        <NotificationTitle>Error</NotificationTitle>
        <NotificationDescription>{message}</NotificationDescription>
        <NotificationActionText onClick={onClick} altText="Try Again">
          Try Again
        </NotificationActionText>
      </ToastContent>
      <Close onClick={reset}>
        <CrossIcon size={24} color={Colors.Grey} />
      </Close>
    </Toast>
  )
}

const Toast = styled(ToastPrimitive.Root)`
  display: flex;
  column-gap: 16px;
  position: relative;
  width: 330px;
  height: fit-content;
  padding: 8px;
  border: 1px solid ${Colors.GreyLight};
  border-radius: 4px;
  background-color: ${Colors.White};
  box-shadow: 0 12px 32px rgba(6, 20, 57, 0.05), 0 8px 16px rgba(6, 20, 57, 0.05), 0 4px 8px rgba(6, 20, 57, 0.03);
`

const NotificationIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
`

const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`

const NotificationTitle = styled(ToastPrimitive.Title)`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.Red};
`

const NotificationDescription = styled(ToastPrimitive.Description)`
  margin: 8px 0 12px;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.Grey};
`

const NotificationActionText = styled(ToastPrimitive.Action)`
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.Black};
  background-color: ${Colors.Transparent};
  border: none;
  padding: 0;
  text-align: left;
`

const Close = styled(ToastPrimitive.Close)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  color: ${Colors.Grey};
  background: none;
  border: none;
`
