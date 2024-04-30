import styled from 'styled-components'
import { WinType } from '@/types/winType'
import { UserBid } from '@/types/bid'
import { TxFlowSteps } from '@/components/auction/TxFlowSteps'
import { Form, FormHeading, FormText } from '@/components/form'
import { Button } from '@/components/buttons'
import { formatEther } from 'viem'
import { Colors } from '@/styles/colors'
import { ReactNode } from 'react'
import { ClaimVoucherSection } from '@/components/userActious/claim/ClaimVoucherSection'

const withdrawText = {
  [WinType.Loss]: `You can withdraw all your funds.`,
  [WinType.GoldenTicket]: 'This means your ticket is free, so you can withdraw all your funds.',
  [WinType.Raffle]: 'This means that you can withdraw all funds you bid over the reserve price.',
}

interface WinBidFormProps {
  userBid: UserBid
  withdrawalAmount: bigint
  setView: (state: TxFlowSteps) => void
  voucher: string | undefined
  setVoucher: (val: string) => void
}

export const WinBidForm = ({ userBid, withdrawalAmount, setView, voucher, setVoucher }: WinBidFormProps) => {
  const isWinningBid = userBid.winType !== WinType.Loss

  return (
    <WinnerForm>
      <WinFormHeading $voucher={voucher}>{isWinningBid ? 'Congratulations 🎉 ' : 'No luck 😔'}</WinFormHeading>
      <FormText>{winTypeToText[userBid.winType]}</FormText>
      {!userBid.claimed && userBid.winType !== WinType.Auction && (
        <WinOption>
          <span>{withdrawText[userBid.winType]}</span>
          <Button view="primary" onClick={() => setView(TxFlowSteps.Review)} wide>
            <span>Withdraw {formatEther(withdrawalAmount)} ETH</span>
          </Button>
        </WinOption>
      )}
      {!voucher && isWinningBid && <ClaimVoucherSection setVoucher={setVoucher} />}
    </WinnerForm>
  )
}

export const WinnerForm = styled(Form)`
  max-width: 440px;
  row-gap: 20px;
  text-align: center;
`

const winTypeToText: Record<WinType, ReactNode> = {
  [WinType.Loss]: <span>We are sorry, but you did not win in auction or raffle.</span>,
  [WinType.GoldenTicket]: (
    <span>
      You won <b>the Golden Ticket!</b>
    </span>
  ),
  [WinType.Auction]: (
    <span>
      Your bid was in the top 20, so you <b>won a ticket</b> to Devcon 7!
    </span>
  ),
  [WinType.Raffle]: (
    <span>
      You were chosen <b>in the raffle!</b>
    </span>
  ),
}

export const WinOption = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
  color: ${Colors.Black};
`

const WinFormHeading = styled(FormHeading)<{ $voucher?: string }>`
  font-size: ${({ $voucher }) => ($voucher ? '24px' : '40px')};
`
