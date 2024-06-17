import { Transactions } from '@/blockchain/transaction'
import styled from 'styled-components'
import { TxFlowSteps } from '../TxFlowSteps'
import { TransactionSuccessHeader } from './TransactionSuccessHeader'
import { useExplorerTxLink } from '@/blockchain/hooks/useExplorerLinks'
import { CopyButton } from '@/components/buttons/CopyButton'
import { RedirectButton } from '@/components/buttons/RedirectButton'
import { Button } from '@/components/buttons'
import { Form, InputLabel } from '@/components/form'
import { Colors } from '@/styles/colors'
import { shortenHexString } from '@/utils/formatters/shortenHexString'
import { Hex } from 'viem'
import { MediaQueries } from '@/styles/mediaQueries'
import { shareText } from '@/constants/shareText'
import { FarcasterIcon, TwitterIcon } from '@/components/icons'

interface Props {
  txHash: Hex | undefined
  action: Transactions
  setView: (state: TxFlowSteps) => void
  onBackHome: () => void
}

export const TransactionSuccess = ({ txHash, action, setView, onBackHome }: Props) => {
  const transactionLink = useExplorerTxLink(txHash ?? '0x')

  const goHome = async () => {
    onBackHome()
    setView(0)
  }

  if (!txHash) {
    return null
  }

  return (
    <Container>
      <TransactionSuccessHeader action={action} />
      <TransactionIdWrapper>
        <TransactionIdLabel>Your transaction hash</TransactionIdLabel>
        <TransactionIdBox>
          <TransactionIdText>{shortenHexString(txHash, 6, 12)}</TransactionIdText>
          <CopyButton value={txHash} side="top" text="Copy transaction hash" />
          <RedirectButton link={transactionLink} side="top" tooltip="View on Arbiscan" />
        </TransactionIdBox>
      </TransactionIdWrapper>
      {action === Transactions.Place && (
        <>
          <Button
            onClick={() => window.open(`https://warpcast.com/~/compose?text=${shareText}`, '_blank')}
            wide
            icon={FarcasterIcon}
          >
            Share on Farcaster
          </Button>
          <Button
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${shareText}`, '_blank')}
            className="twitter-share-button"
            wide
            icon={TwitterIcon}
          >
            Share on X
          </Button>
        </>
      )}
      <Button view="secondary" onClick={goHome} wide>
        Back to home
      </Button>
    </Container>
  )
}

const Container = styled(Form)`
  row-gap: 24px;

  ${MediaQueries.large} {
    row-gap: 16px;
  }
`

const TransactionIdWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const TransactionIdLabel = styled(InputLabel)`
  justify-content: flex-start;
  margin-bottom: 8px;
`

const TransactionIdBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${Colors.White};
  padding: 8px 12px;
  height: 40px;
`

const TransactionIdText = styled.span`
  flex: 1;
  color: ${Colors.Grey};
`
