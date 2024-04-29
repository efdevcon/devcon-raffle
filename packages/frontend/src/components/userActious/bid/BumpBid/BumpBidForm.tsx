import { TxFlowSteps } from '@/components/auction/TxFlowSteps'
import { Form, FormHeading, FormRow, FormWrapper, Input } from '@/components/form'
import { Bid } from '@/types/bid'
import { Separator } from '@radix-ui/react-separator'
import styled from 'styled-components'
import { formatEther } from 'viem'
import { useAccount, useBalance } from 'wagmi'
import { getPositionAfterBump } from './getPositionAfterBump'
import { Button } from '@/components/buttons'
import { useBids } from '@/providers/BidsProvider'

interface BumpBidProps {
  userBid?: Bid
  newBidAmount?: bigint
  bumpAmount: string
  parsedBumpAmount: bigint
  minimumIncrement: bigint
  setBumpAmount: (val: string) => void
  setView: (state: TxFlowSteps) => void
}

export const BumpBidForm = ({
  userBid,
  newBidAmount = BigInt(0),
  bumpAmount,
  parsedBumpAmount,
  minimumIncrement,
  setBumpAmount,
  setView,
}: BumpBidProps) => {
  const { address } = useAccount()
  const { bidList: bids } = useBids()
  const userBalance = useBalance({ address }).data?.value
  const notEnoughBalance = userBalance !== undefined && parsedBumpAmount > userBalance
  const bidTooLow = parsedBumpAmount < minimumIncrement

  return (
    <FormWrapper>
      <FormHeading>Bump your bid</FormHeading>
      <BumpForm>
        <FormRow>
          <span>Your current bid</span>
          <span>{formatEther(userBid?.amount ?? BigInt(0))} ETH</span>
        </FormRow>
        <FormRow>
          <span>Current place in the raffle</span>
          <span>No. {userBid?.place}</span>
        </FormRow>
        <Input
          initialAmount={bumpAmount}
          setAmount={setBumpAmount}
          notEnoughBalance={notEnoughBalance}
          bidTooLow={bidTooLow}
        />
        <FormRow>
          <span>Min. increment of the bid</span>
          <span>{formatEther(minimumIncrement)} ETH</span>
        </FormRow>
        <Separator />
        <FormRow>
          <span>Your bid after the bump</span>
          <span>{formatEther(newBidAmount)} ETH</span>
        </FormRow>
        <FormRow>
          <span>Place in the raffle after the bump</span>
          <span>
            No. {userBid && (bidTooLow ? userBid.place : getPositionAfterBump(newBidAmount, userBid.bidderId, bids))}
          </span>
        </FormRow>
        <Button
          disabled={notEnoughBalance || bidTooLow}
          onClick={() => {
            setView(TxFlowSteps.Review)
          }}
          wide
        >
          Bump your bid
        </Button>
      </BumpForm>
    </FormWrapper>
  )
}

const BumpForm = styled(Form)`
  row-gap: 8px;
`
