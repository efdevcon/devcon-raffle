import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import { Colors } from "@/styles/colors";
import { Button } from "@/components/buttons";
import { Modal } from "@/components/topBar/Modal";
import { shortenEthAddress } from "@/utils/formatters/shortenEthAddress";
import { CopyButton } from "@/components/buttons/CopyButton";
import { RedirectButton } from "@/components/buttons/RedirectButton";
import { useExplorerAddressLink } from "@/blockchain/hooks/useExplorerAddressLink";

export interface ModalProps {
  isShown: boolean | undefined
  onRequestClose: () => void
}

export const AccountDetailModal = ({ isShown, onRequestClose }: ModalProps) => {
  const {open, close} = useWeb3Modal()
  const { connector, address } = useAccount()
  const accountIconRef = useRef<any>(null)
  const chainId = useChainId()
  const [wallet, setWallet] = useState('-')
  const explorerLink = useExplorerAddressLink(address)
  const {disconnect} = useDisconnect()
  // const { isBraveWallet } = useWhichWallet()

  // useEffect(() => {
  //   setWallet(getWalletName(web3Modal.cachedProvider, isBraveWallet))
  //   if (account && accountIconRef.current) {
  //     accountIconRef.current.innerHTML = ''
  //     accountIconRef.current.appendChild(Jazzicon(40, parseInt(account.slice(2, 10), 16)))
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [account])
  //
  // const onDisconnect = useCallback(() => {
  //   onRequestClose()
  //   localStorage.removeItem('walletconnect')
  //   removeWalletLinkStorage()
  //   web3Modal.clearCachedProvider()
  //   deactivate()
  // }, [onRequestClose, deactivate, web3Modal])

  return (
    <Modal isShown={isShown} onRequestClose={onRequestClose} title="Your account">
      <ContentWrapper>
        <ContentRow>
          <ConnectedWallet>Connected with {wallet}</ConnectedWallet>
        </ContentRow>
        {address && (
          <>
            <ContentRow>
              <AccountIcon ref={accountIconRef} />
              <AccountAddress>{shortenEthAddress(address)}</AccountAddress>
            </ContentRow>
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
      <Button view="secondary" onClick={() => disconnect()}>
        Disconnect
      </Button>
    </Modal>
  )
}

const AccountIcon = styled.div`
  display: flex;
  place-items: center;
  height: 40px;
  width: 40px;
  background-color: ${Colors.Blue};
  border-radius: 50%;
`

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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;
  padding: 20px;
  border: 1px solid #e7eaf3;
`
