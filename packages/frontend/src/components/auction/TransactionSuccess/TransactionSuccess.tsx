import { Transactions } from '@/blockchain/transaction'
import styled from 'styled-components'
import { TxFlowSteps } from '../TxFlowSteps'
import { TransactionSuccessHeader } from './TransactionSuccessHeader'
import { useExplorerTxLink } from '@/blockchain/hooks/useExplorerLink'
import { shortenTxHash } from './shortenTxHash'
import { CopyButton } from '@/components/buttons/CopyButton'
import { RedirectButton } from '@/components/buttons/RedirectButton'
import { Button } from '@/components/buttons'
import { Form, InputLabel } from '@/components/form'
import { Colors } from '@/styles/colors'

interface Props {
  txHash: string | undefined
  action: Transactions
  setView: (state: TxFlowSteps) => void
  unlockViewFromTransaction?: () => void
}

export const TransactionSuccess = ({ txHash, action, setView, unlockViewFromTransaction }: Props) => {
  const transactionLink = useExplorerTxLink(txHash ?? '0x')

  const goHome = () => {
    setView(0)
    unlockViewFromTransaction?.()
  }

  if (!txHash) {
    return null
  }

  return (
    <Container>
      <TransactionSuccessHeader action={action} />
      <TransactionIdWrapper>
        <TransactionIdLabel>Your transaction ID</TransactionIdLabel>
        <TransactionIdBox>
          <TransactionIdText>{shortenTxHash(txHash)}</TransactionIdText>
          <CopyButton value={txHash} side="top" text="Copy transaction ID" />
          <RedirectButton link={transactionLink} side="top" tooltip="View on Arbiscan" />
        </TransactionIdBox>
      </TransactionIdWrapper>
      <Button view="primary" onClick={goHome}>
        Back to home
      </Button>
    </Container>
  )
}

const Container = styled(Form)`
  row-gap: 24px;
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
