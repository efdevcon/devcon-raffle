import { IconProps } from '@/components/icons/IconBase'

export const CloseIcon = ({ color, size, className }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" color={color} className={className}>
      <path d="M1 1L14 14" stroke="currentColor" />
      <path d="M1 14L14 0.999999" stroke="currentColor" />
    </svg>
  )
}
