import { useAccount } from 'wagmi'
import { useState } from 'react'
import { Button } from '@/components/buttons/Button'
import { shortenHexString } from '@/utils/formatters/shortenHexString'
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
            {shortenHexString(address, 4)}
          </Button>
          {isModalOpen && <AccountDetailModal isShown={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />}
        </>
      ) : (
        <ConnectWalletButton view="secondary" />
      )}
    </>
  )
}
