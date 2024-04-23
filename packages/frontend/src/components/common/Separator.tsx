import * as SeparatorPrimitive from '@radix-ui/react-separator'
import styled from 'styled-components'
import { Colors } from '@/styles/colors'

interface SeparatorElementProps {
  orientation?: 'horizontal' | 'vertical'
  color?: string
}

export const Separator = ({ orientation = 'horizontal', color }: SeparatorElementProps) => {
  return <SeparatorElement orientation={orientation} color={color} decorative />
}

const SeparatorElement = styled(SeparatorPrimitive.Root)<SeparatorElementProps>`
  background-color: ${({ color }) => (color ? color : Colors.GreenLight)};

  &[data-orientation='horizontal'] {
    height: 1px;
    width: 100%;
  }

  &[data-orientation='vertical'] {
    height: 100%;
    width: 1px;
  }
`

export const SeparatorWithText = ({ text }: { text: string }) => {
  return (
    <SeparatorWrapper>
      <Separator color={Colors.Black} />
      {text}
      <Separator color={Colors.Black} />
    </SeparatorWrapper>
  )
}

const SeparatorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  color: ${Colors.Black};
`
