import { useAccount } from 'wagmi'
import { useState } from 'react'
import { Button } from '@/components/buttons/Button'
import { shortenHexString } from '@/utils/formatters/shortenHexString'
import { ConnectWalletButton } from '@/components/buttons/ConnectWalletButton'
import { AccountDetailModal } from '@/components/topBar/AccountDetailModal'
import { styled } from 'styled-components'
import { MediaQueries } from '@/styles/mediaQueries'

export const AccountButton = () => {
  const { address } = useAccount()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {address ? (
        <>
          <AddressButton view="secondary" onClick={() => setIsModalOpen(!isModalOpen)}>
            {shortenHexString(address, 4)}
          </AddressButton>
          {isModalOpen && <AccountDetailModal isShown={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />}
        </>
      ) : (
        <ConnectWalletButton view="secondary" />
      )}
    </>
  )
}

const AddressButton = styled(Button)`
  ${MediaQueries.medium} {
    max-width: 125px;
  }
`
