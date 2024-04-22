import styled from 'styled-components'
import { useAccount, useDisconnect } from 'wagmi'
import { Colors } from '@/styles/colors'
import { Button } from '@/components/buttons'
import { Modal } from '@/components/topBar/Modal'
import { shortenEthAddress } from '@/utils/formatters/shortenEthAddress'
import { CopyButton } from '@/components/buttons/CopyButton'
import { RedirectButton } from '@/components/buttons/RedirectButton'
import { useExplorerAddressLink } from '@/blockchain/hooks/useExplorerAddressLink'

export interface ModalProps {
  isShown: boolean | undefined
  onRequestClose: () => void
}

export const AccountDetailModal = ({ isShown, onRequestClose }: ModalProps) => {
  const { connector, address } = useAccount()
  const explorerLink = useExplorerAddressLink(address)
  const { disconnectAsync } = useDisconnect()

  const onDisconnect = async () => {
    await disconnectAsync()
    onRequestClose()
  }

  return (
    <Modal isShown={isShown} onRequestClose={onRequestClose} title="Your account">
      <ContentWrapper>
        <ContentRow>
          <ConnectedWallet>Connected with {connector?.name}</ConnectedWallet>
        </ContentRow>
        {address && (
          <>
            <CenteredContentRow>
              <AccountAddress>{shortenEthAddress(address)}</AccountAddress>
            </CenteredContentRow>
            <ContentRow>
              <RedirectButton
                link={explorerLink ?? ''}
                tooltip="View on Arbiscan"
                color={Colors.Blue}
                label=" View in block explorer"
                side="top"
              />
              <CopyButton
                value={address}
                text="Copy account address"
                color={Colors.Blue}
                label="Copy address"
                side="top"
              />
            </ContentRow>
          </>
        )}
      </ContentWrapper>
      <Button view="secondary" onClick={onDisconnect}>
        Disconnect
      </Button>
    </Modal>
  )
}

const AccountAddress = styled.p`
  font-family: 'Space Mono', 'Roboto Mono', monospace;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.Black};
`

const ConnectedWallet = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 32px;
  color: ${Colors.Grey};
`

const ContentRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 16px;
`

const CenteredContentRow = styled(ContentRow)`
  width: 100%;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;
  padding: 20px;
  border: 1px solid #e7eaf3;
`
