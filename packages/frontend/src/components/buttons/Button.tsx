import { FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { Colors } from '@/styles/colors'
import { IconProps, LoadingIcon } from '@/components/icons'
import { TransientProps } from '@/styles/transientProps'
import { MediaQueries } from '@/styles/mediaQueries'

export interface ButtonProps {
  children: ReactNode
  className?: string
  view?: 'primary' | 'secondary'
  wide?: boolean
  disabled?: boolean
  isLoading?: boolean
  onClick?: () => void
  icon?: FC<IconProps>
}

export const Button = ({
  children,
  className,
  view = 'primary',
  wide,
  disabled,
  isLoading,
  onClick,
  icon: Icon,
}: ButtonProps) => {
  return (
    <ButtonContainer
      className={className}
      $view={view}
      $wide={wide}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      onClick={onClick}
      icon={Icon}
    >
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      {isLoading ? <LoadingIcon /> : children}
    </ButtonContainer>
  )
}

type ButtonTransientProps = TransientProps<ButtonProps, 'wide' | 'view'>

const commonButtonStyles = css<ButtonTransientProps>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: ${({ $wide }) => ($wide ? '100%' : '289px')};
  height: 40px;
  margin: 0;
  padding: 8px;
  border: none;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  outline: none;
  overflow: hidden;
  transition: all 0.25s ease;

  ${MediaQueries.medium} {
    width: 100%;
  }

  &:disabled {
    opacity: 0.5;
  }
`

const PrimaryButtonStyles = css<ButtonTransientProps>`
  ${commonButtonStyles};

  background-color: ${Colors.Black};
  color: ${Colors.White};
`

const SecondaryButtonStyles = css<ButtonTransientProps>`
  ${commonButtonStyles};

  background-color: ${Colors.White};
  color: ${Colors.Black};
  border: 1px solid ${Colors.Black};

  &:hover:enabled,
  &:focus-visible {
    background-color: ${Colors.Pink};
  }

  &:active {
    background-color: ${Colors.Pink};
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
`

export const ButtonContainer = styled.button<ButtonTransientProps>`
  ${({ $view }) => {
    switch ($view) {
      case 'primary':
      default:
        return PrimaryButtonStyles
      case 'secondary':
        return SecondaryButtonStyles
    }
  }};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`
