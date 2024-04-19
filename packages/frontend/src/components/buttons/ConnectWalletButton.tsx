import { Button, ButtonProps } from './Button'
import { useWeb3Modal } from '@web3modal/wagmi/react'

type ConnectWalletButtonProps = Omit<ButtonProps, 'onClick' | 'children'>

export const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const { open } = useWeb3Modal()

  return (
    <Button {...props} onClick={() => open()}>
      Connect Wallet
    </Button>
  )
}
