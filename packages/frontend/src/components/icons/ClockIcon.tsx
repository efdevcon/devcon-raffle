import { IconProps } from '@/components/icons/IconBase'

export const ClockIcon = ({ color, size, className }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 38 38" fill="none" color={color} className={className}>
      <circle cx="19" cy="19" r="19" fill="#0F0F0F" />
      <path d="M33.1714 26.4277C31.8495 28.9498 29.8785 31.0734 27.4618 32.5793C25.0451 34.0853 22.2702 34.919 19.4237 34.9944C16.5772 35.0698 13.7621 34.3842 11.269 33.0083C8.77596 31.6324 6.69525 29.6161 5.24167 27.1675C3.78809 24.7189 3.01431 21.9268 3.0002 19.0793C2.98608 16.2318 3.73215 13.4321 5.16138 10.9693C6.59061 8.50641 8.65123 6.46959 11.1305 5.06905C13.6098 3.66852 16.418 2.95501 19.2651 3.0022L19 19L33.1714 26.4277Z" fill="white" />
    </svg>
  )
}
