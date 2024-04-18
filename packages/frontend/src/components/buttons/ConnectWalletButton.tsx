import { useConnect } from 'wagmi'
import { Button, ButtonProps } from './Button'

type ConnectWalletButtonProps = Omit<ButtonProps, 'onClick' | 'children'>

export const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const { connect, connectors } = useConnect()

  return (
    <Button {...props} onClick={() => connect({ connector: connectors[0] })}>
      Connect Wallet
    </Button>
  )
}
