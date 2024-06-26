import styled from 'styled-components'
import { CloseIcon } from '@/components/icons'
import { Colors } from '@/styles/colors'

interface CloseButtonProps {
  color?: string
  size?: number
  onClick: () => void
}
export const CloseButton = ({ color, size, onClick }: CloseButtonProps) => {
  return (
    <CloseButtonWrapper onClick={onClick}>
      <CloseIcon color={color} size={size} />
    </CloseButtonWrapper>
  )
}

const CloseButtonWrapper = styled.button`
  min-width: 24px;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  background-color: ${Colors.Transparent};
  outline: none;
`
