import { useAccount } from 'wagmi'
import { useState } from 'react'
import { Button } from '@/components/buttons/Button'
import { shortenEthAddress } from '@/utils/formatters/shortenEthAddress'
import { ConnectWalletButton } from '@/components/buttons/ConnectWalletButton'
import { AccountDetailModal } from '@/components/topBar/AccountDetailModal'

export const AccountButton = () => {
  const { address } = useAccount()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {address ? (
        <>
          <Button view="secondary" onClick={() => setIsModalOpen(!isModalOpen)}>
            {shortenEthAddress(address)}
          </Button>
          {isModalOpen && <AccountDetailModal isShown={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />}
        </>
      ) : (
        <ConnectWalletButton view="secondary" />
      )}
    </>
  )
}
