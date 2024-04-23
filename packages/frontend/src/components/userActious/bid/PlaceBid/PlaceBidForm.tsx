import { TxFlowSteps } from '@/components/auction/TxFlowSteps'
import { Button } from '@/components/buttons'
import { Form, FormHeading, FormRow, FormWrapper, Input } from '@/components/form'
import { Bid } from '@/types/bid'
import { formatEther } from 'viem'
import { useBalance } from 'wagmi'
import { getPositionAfterBid } from '../getPositionAfterBid'

interface PlaceBidFormProps {
  bid: string
  parsedBid: bigint
  setBid: (val: string) => void
  minimumBid: bigint
  bids: Bid[]
  setView: (state: TxFlowSteps) => void
}

export const PlaceBidForm = ({ bid, parsedBid, setBid, minimumBid, bids, setView }: PlaceBidFormProps) => {
  const userBalance = useBalance().data?.value
  const notEnoughBalance = userBalance !== undefined && parsedBid > userBalance
  const bidTooLow = parsedBid < minimumBid

  return (
    <FormWrapper>
      <FormHeading>Place bid</FormHeading>
      <Form>
        <FormRow>
          <span>Raffle price (min. bid)</span>
          <span>{formatEther(minimumBid)} ETH</span>
        </FormRow>
        <Input initialAmount={bid} setAmount={setBid} notEnoughBalance={notEnoughBalance} bidTooLow={bidTooLow} />
        <FormRow>
          <span>Your place in the raffle after the bid</span>
          <span>No. {getPositionAfterBid(parsedBid, bids)}</span>
        </FormRow>
        <Button disabled={notEnoughBalance || bidTooLow} onClick={() => setView(TxFlowSteps.Review)} wide>
          Place bid
        </Button>
      </Form>
    </FormWrapper>
  )
}
