import * as Accordion from '@radix-ui/react-accordion'
import styled from 'styled-components'
import { ArrowDownIcon } from '../icons'
import { Colors } from '@/styles/colors'
import { Rule, RuleText } from '@/components/info/Rules'
import { formatDate } from '@/utils/formatters/formatDate'
import { useVoucherRedeemDeadline } from '@/blockchain/hooks/useVoucherRedeemDeadline'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { MediaQueries } from '@/styles/mediaQueries'
import { urls } from '@/constants/urls'

const gitcoinSupportUrl = 'https://support.passport.xyz/passport-knowledge-base'
const reservePrice = 0.08

export const InfoAccordion = () => {
  const { auctionWinnersCount, raffleWinnersCount } = useReadAuctionParams()
  const redeemTimestamp = useVoucherRedeemDeadline()
  const totalCount = auctionWinnersCount && raffleWinnersCount && auctionWinnersCount + raffleWinnersCount
  const exampleBid = 0.5

  return (
    <Wrapper>
      <Accordion.Root type="single" defaultValue="item-1" collapsible>
        <Accordion.Item value="item-1">
          <StyledHeader>
            <AccordionStyledTrigger heading="What is this?" />
          </StyledHeader>
          <StyledContent>
            <span>
              With the generous help of the{' '}
              <Link href="https://x.com/fairyrnd" target="_blank">
                Fairy
              </Link>{' '}
              &{' '}
              <Link href="https://x.com/archblock_" target="_blank">
                Archblock
              </Link>{' '}
              teams, we are building off of Devcon VI’s iteration of the Raffle-Auction to sell a portion of this year’s
              tickets. This iteration will include{' '}
              <Link href={gitcoinSupportUrl} target="_blank">
                Gitcoin Passport
              </Link>{' '}
              as a sybil-resistance mechanism.
              <br />
              <br />
              We want to continue demonstrating the power of Ethereum to host provably fair and verifiable Raffles &
              Auctions, while also increasing the methods we use to distribute tickets to the thousands that want to
              attend each year.
            </span>
          </StyledContent>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <StyledHeader>
            <AccordionStyledTrigger heading="How do I participate in the Auction & Raffle?" />
          </StyledHeader>
          <StyledContent>
            <span>
              Connect or create your{' '}
              <Link href={gitcoinSupportUrl} target="_blank">
                Gitcoin Passport
              </Link>
              . Once you prove your humanity with a Passport score of 20+, submit a bid for a ticket based on the amount
              you would value a Devcon ticket. Bid high to compete for the 20 tickets distributed in the auction, or bid
              the reserve price to be entered into the raffle. You need to bid at least the reserve price, which is set
              to the price of a Devcon Builder ticket at time of publication: <Bold>0.08 ETH</Bold>. Please note that
              you will need to submit your name at the time of check-out, as we will check IDs at Devcon to verify that
              the participant is the ticket holder.
            </span>
          </StyledContent>
        </Accordion.Item>

        <Accordion.Item value="item-3">
          <StyledHeader>
            <AccordionStyledTrigger heading="ELI5 plz?" />
          </StyledHeader>
          <StyledContent>
            <ol>
              <li>
                Connect or create a{' '}
                <Link href={urls.gitcoin} target="_blank">
                  Gitcoin Passport
                </Link>
              </li>
              <li>
                Determine how much you would like to bid. The reserve price is 0.08 ETH. At any point you can top-up
                your bid.
                <ol type="a">
                  <li>
                    If you bid at the reserve price (0.08 ETH), you will be automatically entered into the raffle to win
                    one of 184 tickets.
                  </li>
                  <li>
                    If you bid more than 0.08 ETH, you have the chance to win a ticket in the auction.
                    <ol type="i">
                      <li>
                        If your bid is in the top 20 highest bids, you will win one of the 20 tickets allocated to the
                        auction.
                      </li>
                      <li>
                        If your bid is below the top 20 highest bids, you will be entered into the raffle. If you win
                        the raffle, you will be able to withdraw the difference between your bid and the reserve price
                        (0.08 ETH).
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                If you do not win in the raffle nor the auction, you will be able to withdraw your entire bid amount.
              </li>
              <li>
                Please note:{' '}
                <Underline>
                  We will be requiring name input at the time of ticket check-out & IDs will be cross-checked at the
                  door, to ensure no scalping or resale of the discounted ticket takes place.
                </Underline>
              </li>
            </ol>
          </StyledContent>
        </Accordion.Item>

        <Accordion.Item value="item-4">
          <StyledHeader>
            <AccordionStyledTrigger heading="Contest rules" />
          </StyledHeader>
          <StyledContent>
            <RuleText>
              The total number of {totalCount} tickets will be divided between the auction and the raffle pools. All
              winners will receive a voucher code that must be redeemed for a Devcon ticket.
            </RuleText>
            <Rule
              heading={`Auction pool: ${auctionWinnersCount} tickets`}
              rule="Tickets from the auction pool will be distributed to the highest bidding participants. The price paid by a winner in that pool is equal to the amount of their bid. All proceeds will go towards Public Goods."
              example={`You bid ${exampleBid} ETH and end up in the top ${auctionWinnersCount} of the bidders. You receive a ticket for ${exampleBid} ETH.`}
            />
            <Rule
              heading={`Raffle pool: ${raffleWinnersCount} tickets`}
              rule={`From participants who bid below the last bid in the auction pool, ${raffleWinnersCount} will be chosen at random. A winner in that pool will receive a ticket for ${reservePrice} ETH. All funds that they bid over that price will be claimable after the raffle is settled.`}
              example={`You bid ${exampleBid} ETH and end up below the top ${auctionWinnersCount}. If you are selected in the raffle, you pay ${reservePrice} ETH for the ticket and get ${(
                exampleBid - reservePrice
              ).toFixed(2)} ETH back.`}
            />
            <Rule
              heading="Golden Ticket: 1 ticket"
              rule="One lucky bidder from the raffle pool will receive a ticket for Devcon 6 totally for free! The Golden Ticket winner will be able to claim the whole amount of their bid after the raffle is settled."
            />
            <Rule
              heading="No luck?"
              rule="In case you don't win, you will be able to withdraw your bid amount minus a 2% sybil-resistance fee."
              example={`You bid ${exampleBid} ETH and end up not winning a ticket. You can get ${
                exampleBid * 0.98
              } ETH back.`}
            />
            <Rule
              heading="What if there’s less than 100 participants?"
              rule={
                <>
                  In the event there are:
                  <BulletList>
                    <li>
                      <Bold>1-80 participants:</Bold> All bidders win in the raffle.
                    </li>
                    <li>
                      <Bold>81 participants:</Bold> Top 1 bidder wins in the auction. 80 remaining bidders win in the
                      raffle.
                    </li>
                    <li>
                      <Bold>101 participants:</Bold> Top 20 bidders win in the auction. Out of 81 remaining bidders, 80
                      are randomly chosen to win in the raffle.
                    </li>
                    <li>
                      <Bold>120 participants:</Bold> Top 20 bidders win in the auction. Out of 100 remaining bidders, 80
                      are randomly chosen to win in the raffle.
                    </li>
                  </BulletList>
                </>
              }
            />
            <Rule
              heading="What happens when there's a draw?"
              rule="In case there’s a draw between two bids, the earlier bidder takes precedence."
              example={
                <>
                  Bidder A places their first bid of {exampleBid} ETH which puts them in the 1st place. Later Bidder B
                  places their first bid of the same amount which puts them in 2nd place. Next, Bidder B bumps their bid
                  to {exampleBid + 0.1} ETH which puts them in 1st place. Bidder A notices that they lost the first
                  place and decides to bump their bid as well. Bidder A bumps their bid to {exampleBid + 0.1} ETH which{' '}
                  <Bold>puts them in the 1st place</Bold>, because they placed their first bid before Bidder B.
                </>
              }
            />
          </StyledContent>
        </Accordion.Item>

        <Accordion.Item value="item-5">
          <StyledHeader>
            <AccordionStyledTrigger heading="In what form will I get the ticket?" />
          </StyledHeader>
          <StyledContent>
            After the raffle is settled, you will have 48 hours (<Bold>until {formatDate(redeemTimestamp)}</Bold>) to
            claim your voucher code for the ticket. In order to do so, you will be asked to sign a message using your
            wallet to authenticate as the owner of the winning account. The voucher code will be presented to you on
            this page.
          </StyledContent>
        </Accordion.Item>

        <Accordion.Item value="item-6">
          <StyledHeader>
            <AccordionStyledTrigger heading="Okay, I got a voucher code. What do I do now?" />
          </StyledHeader>
          <StyledContent>
            <span>
              Your Voucher Code will be available to you for 48 hours after the closing of the Auction & Raffle (
              <Bold>until {formatDate(redeemTimestamp)}</Bold>). Once you have input your voucher code into our ticket
              portal, you will go through the standard ticket checkout flow. You can go to{' '}
              <Link href="https://tickets.devcon.org/">our ticket shop here</Link> to redeem your voucher code for a
              Devcon 6 ticket. See you at the conference!
            </span>
          </StyledContent>
        </Accordion.Item>

        <Accordion.Item value="item-7">
          <StyledHeader>
            <AccordionStyledTrigger heading="Other FAQ" />
          </StyledHeader>
          <StyledContent>
            <span>
              Please read our Terms & Conditions{' '}
              <Link href="https://docs.google.com/document/d/1pVU-G8mpPD33EwOwE96MTB_4AZrYa2TNWXLSfkOPCJQ/edit?usp=sharing">
                here
              </Link>{' '}
              as well as our full Auction & Raffle FAQ on our website{' '}
              <Link href="https://devcon.org/en/raffle-auction/">here</Link>.
            </span>
          </StyledContent>
        </Accordion.Item>
      </Accordion.Root>
    </Wrapper>
  )
}

interface AccordionTriggerProps {
  heading: string
}

const AccordionStyledTrigger = ({ heading }: AccordionTriggerProps) => {
  return (
    <StyledTrigger>
      <span>{heading}</span>
      <AccordionArrow color={Colors.Black} size={22} />
    </StyledTrigger>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1252px;
  margin: 0 auto;
  padding: 44px 90px 44px 32px;

  ${MediaQueries.large} {
    padding: 32px;
  }
`

const StyledHeader = styled(Accordion.Header)`
  width: 100%;
`

const StyledTrigger = styled(Accordion.AccordionTrigger)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 10px 4px 4px;
  font-family: 'Space Mono', 'Roboto Mono', monospace;
  font-style: normal;
  border: none;
  background-color: ${Colors.GreyLight};
  text-align: left;
  font-size: 20px;
  line-height: 1.5;

  ${MediaQueries.medium} {
    font-size: 14px;
  }

  &[data-state='open'] {
    font-weight: 700;
  }

  &[data-state='open'] > div {
    transform: translateY(100%) rotate(180deg);
  }
`

const StyledContent = styled(Accordion.AccordionContent)`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-top: 44px;

  ${MediaQueries.medium} {
    margin-top: 16px;
    font-size: 14px;
  }

  &[data-state='open'] {
    margin-bottom: 44px;

    ${MediaQueries.medium} {
      margin-bottom: 16px;
    }
  }
`

const Italic = styled.span`
  font-style: italic;
  display: contents;
`

const Underline = styled.span`
  text-decoration: underline;
`

const Bold = styled.span`
  font-weight: 600;
  display: contents;
`

const AccordionArrow = styled(ArrowDownIcon)`
  transform: rotate(0);
  transform-origin: top;
`

const Link = styled.a`
  color: ${Colors.Black};
  text-decoration: underline;
`

const BulletList = styled.ul`
  margin: 0;
`
