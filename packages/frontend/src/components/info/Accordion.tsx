import * as Accordion from '@radix-ui/react-accordion'
import styled from 'styled-components'
import { ArrowDownIcon } from '../icons'
import { Colors } from '@/styles/colors'
import { Rule, RuleText } from '@/components/info/Rules'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { MediaQueries } from '@/styles/mediaQueries'
import { urls } from '@/constants/urls'

const gitcoinSupportUrl = 'https://support.passport.xyz/passport-knowledge-base'
const reservePrice = 0.08
const exampleBid = 0.5

export const InfoAccordion = () => {
  const { auctionWinnersCount, raffleWinnersCount } = useReadAuctionParams()
  const totalCount = auctionWinnersCount && raffleWinnersCount && auctionWinnersCount + raffleWinnersCount

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
              &amp;{' '}
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
              We want to continue demonstrating the power of Ethereum to host provably fair and verifiable Raffles &amp;
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
              you would value a Devcon ticket. Bid high to compete for the {auctionWinnersCount} tickets distributed in
              the auction, or bid the reserve price to be entered into the raffle. You need to bid at least the reserve
              price, which is set to the price of a Devcon Builder ticket at time of publication:{' '}
              <Bold>{reservePrice} ETH</Bold>. Please note that you will need to submit your name at the time of
              check-out, as we will check IDs at Devcon to verify that the participant is the ticket holder.
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
                Determine how much you would like to bid. The reserve price is {reservePrice} ETH. At any point you can
                top-up your bid.
                <ol type="a">
                  <li>
                    If you bid at the reserve price ({reservePrice} ETH), you will be automatically entered into the
                    raffle to win one of 184 tickets.
                  </li>
                  <li>
                    If you bid more than {reservePrice} ETH, you have the chance to win a ticket in the auction.
                    <ol type="i">
                      <li>
                        If your bid is in the top {auctionWinnersCount} highest bids, you will win one of the{' '}
                        {auctionWinnersCount} tickets allocated to the auction.
                      </li>
                      <li>
                        If your bid is below the top {auctionWinnersCount} highest bids, you will be entered into the
                        raffle. If you win the raffle, you will be able to withdraw the difference between your bid and
                        the reserve price ({reservePrice} ETH).
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
                  We will be requiring name input at the time of ticket check-out &amp; IDs will be cross-checked at the
                  door, to ensure no scalping or resale of the discounted ticket takes place.
                </Underline>
              </li>
            </ol>
          </StyledContent>
        </Accordion.Item>

        <Accordion.Item value="item-4">
          <StyledHeader>
            <AccordionStyledTrigger heading="What is a Gitcoin Passport?" />
          </StyledHeader>
          <StyledContent>
            <span>
              <Link href={gitcoinSupportUrl} target="_blank">
                Gitcoin Passport
              </Link>{' '}
              is a best-in-class proof of humanity tool that enables users like you to verify that you are a unique
              human using a variety of different activities and tools, such as KYC, wallet transaction history, and web2
              activities.
              <br /> <br />
              By using Passport, Devcon is enhancing fairness &amp; equity in our Raffle-Auction, making sure that only
              humans will be able to participate in their raffle-auction, and not Sybils or other malicious accounts.
              <br />
              <br />
              <Link href={gitcoinSupportUrl} target="_blank">
                Learn all about it here
              </Link>
              .
            </span>
          </StyledContent>
        </Accordion.Item>

        <Accordion.Item value="item-5">
          <StyledHeader>
            <AccordionStyledTrigger heading="Contest rules" />
          </StyledHeader>
          <StyledContent>
            <RuleText>
              The total number of {totalCount} tickets will be divided between the auction and the raffle pools. All
              winners will receive a link that can be redeemed for a Devcon ticket.
            </RuleText>
            <Rule
              heading={`Raffle pool: ${raffleWinnersCount} tickets`}
              rule={`From participants who bid below the lowest winning bid in the auction pool, ${raffleWinnersCount} will be chosen at random. A winner in that pool will receive a ticket for ${reservePrice} ETH. All funds that they bid over that price will be reclaimable after the raffle is settled.`}
              example={`You bid ${exampleBid} ETH and don’t win in the auction. If you win in the raffle, you pay ${reservePrice} ETH for the ticket and get ${(
                exampleBid - reservePrice
              ).toFixed(2)} ETH back.`}
            />
            <Rule
              heading={`Auction pool: ${auctionWinnersCount} tickets`}
              rule={`Tickets from the auction pool will be distributed to the ${auctionWinnersCount} highest bidding participants. The price paid by a winner in that pool is equal to the amount of their bid. All proceeds will go towards Public Goods.`}
              example={`You bid ${exampleBid} ETH and end up in the top ${auctionWinnersCount} of the bidders. You receive a ticket for ${exampleBid} ETH.`}
            />
            <Rule
              heading="Golden Ticket: 1 ticket"
              rule="One lucky bidder from the raffle pool will receive a ticket to Devcon 7 for free! The Golden Ticket winner will be able to claim the whole amount of their bid after the raffle is settled."
            />
            <Rule
              heading="No luck?"
              rule="In case you don't win at all, you will be able to withdraw your full bid amount."
              example={`You bid ${exampleBid} ETH and end up not winning a ticket. You can withdraw your ${exampleBid} ETH.`}
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

        <Accordion.Item value="item-6">
          <StyledHeader>
            <AccordionStyledTrigger heading="Okay, I won a ticket. Now what?" />
          </StyledHeader>
          <StyledContent>
            <span>
              Your Voucher Link will be claimable on this site July 19-31. This will send you to our shop to complete
              the standard ticket checkout. See you in Bangkok!
            </span>
          </StyledContent>
        </Accordion.Item>

        <Accordion.Item value="item-7">
          <StyledHeader>
            <AccordionStyledTrigger heading="In what form will I get the ticket?" />
          </StyledHeader>
          <StyledContent>
            After the raffle is settled, you will have all of July to claim your voucher code for the ticket. In order
            to do so, you will be asked to sign a message using your wallet to authenticate as the owner of the winning
            account. If you win, a voucher redemption link will reveal itself after the raffle concludes.
          </StyledContent>
        </Accordion.Item>

        <Accordion.Item value="item-8">
          <StyledHeader>
            <AccordionStyledTrigger heading="Other FAQ" />
          </StyledHeader>
          <StyledContent>
            <Rule
              heading="Do I have to participate to get a ticket to Devcon 7?"
              rule="No! We are working to make this Devcon more accessible. We’ll be featuring a wide variety of discounts for Ethereum contributors, and our public GA sale waves are scheduled for July. However, we encourage you to participate in this fun, early opportunity to acquire a ticket!"
            />
            <Rule
              heading={`What if there’s less than ${totalCount} participants?`}
              rule={
                <>
                  In the event there are:
                  <BulletList>
                    <li>
                      <Bold>1-{raffleWinnersCount} Participants:</Bold> All Participants shall be deemed winners in the
                      Raffle;
                    </li>
                    <li>
                      <Bold>185 Participants:</Bold> The highest valid bid shall be deemed the winner in the Auction.
                      The remaining {raffleWinnersCount} Participants shall be deemed winners in the Raffle;
                    </li>
                    <li>
                      <Bold>186 Participants:</Bold> The two (2) highest valid bids shall be deemed the winners in the
                      Auction. The remaining {raffleWinnersCount} Participants shall be deemed winners in the Raffle;
                    </li>
                    <li>
                      <Bold>187 Participants:</Bold> The three (3) highest valid bids shall be deemed the winners in the
                      Auction. The remaining {raffleWinnersCount} Participants shall be deemed winners in the Raffle;
                    </li>
                    <li>
                      <Bold>Up to 204 Participants:</Bold> And so on up to and including the case where there are{' '}
                      {totalCount} Participants, wherein the twenty ({auctionWinnersCount}) highest valid bids shall be
                      deemed the winners in the Auction and the remaining {raffleWinnersCount} Participants shall be
                      deemed winners in the Raffle.
                    </li>
                  </BulletList>
                </>
              }
            />
            <Rule
              heading="Why are you doing this?"
              rule="We want to continue demonstrating the power of Ethereum to host provably fair and verifiable Raffles & Auctions, while increasing the ways we distribute tickets to the thousands that want to attend each year."
            />
            <Rule
              heading="Where can I find the Smart Contracts or Audit report?"
              rule={
                <span>
                  The Smart Contracts for the Raffle-Auction can be viewed{' '}
                  <Link href="https://github.com/efdevcon/devcon-raffle" target="_blank">
                    here
                  </Link>
                  .<br /> The contracts were audited by Trail of Bits. You can view the audit report{' '}
                  <Link
                    href="https://github.com/efdevcon/devcon-raffle/blob/master/audits/Ethereum%20Foundation%20Devcon%20Auction-Raffle%20Summary%20Report.pdf"
                    target="_blank"
                  >
                    here
                  </Link>
                  .<br /> The contract has been verified on Sourcify, available{' '}
                  <Link href="https://sourcify.dev/#/lookup/0x1E7aC276CBdae55689Df1d99108d69Fff444cB88" target="_blank">
                    here
                  </Link>
                  .
                </span>
              }
            />
            <Rule
              heading="Where can I view the full terms?"
              rule={
                <span>
                  Please read the full Raffle-Auction Terms &amp; Conditions{' '}
                  <Link
                    href="https://docs.google.com/document/d/1YJfq5MU091dkmy6nmUfZWD1uUCqtVPlkIHY1n0odTUo"
                    target="_blank"
                  >
                    here
                  </Link>
                  .
                </span>
              }
            />
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
