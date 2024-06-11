import { useResponsiveHelpers } from '@/hooks/useResponsiveHelper'
import { Button, ButtonProps } from './Button'
import { useWeb3Modal } from '@web3modal/wagmi/react'

type ConnectWalletButtonProps = Omit<ButtonProps, 'onClick' | 'children'>

export const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const { open } = useWeb3Modal()
  const { isMobileWidth } = useResponsiveHelpers()

  return (
    <Button {...props} onClick={() => open()} wide={isMobileWidth}>
      Connect Wallet
    </Button>
  )
}
