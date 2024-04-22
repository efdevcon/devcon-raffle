import { ReactNode, useState } from 'react'
import copyToClipboard from 'copy-to-clipboard'
import styled from 'styled-components'
import { CopyIcon } from '@/components/icons'
import { Tooltip, TooltipButton } from '@/components/tooltip'

interface CopyButtonProps {
  value: string
  text?: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  size?: number
  color?: string
  label?: string
}

export const CopyButton = ({ value, text, side, size, color, label }: CopyButtonProps) => {
  const [tooltipText, setTooltipText] = useState(text)
  const copy = () => {
    copyToClipboard(value)
    setTooltipText('Copied!')
  }

  return (
    <Tooltip side={side} tooltip={tooltipText} onOpenChange={(value) => !value && setTooltipText(text)}>
      <TooltipButton color={color} label={label} onClick={copy}>
        <CopyIcon size={size} color={color} />
        {label && (
          <CopyButtonLabel color={color} onClick={copy}>
            {label}
          </CopyButtonLabel>
        )}
      </TooltipButton>
    </Tooltip>
  )
}

const CopyButtonLabel = styled.span<Pick<CopyButtonProps, 'color' | 'size'>>`
  font-weight: 400;
  font-size: 14px;
  line-height: ${({ size }) => size};
  color: ${({ color }) => color};
`
