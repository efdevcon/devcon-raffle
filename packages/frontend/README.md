# Devcon Raffle Frontend

## Getting Started

```bash
pnpm dev
```

## Voucher Codes

Auction & raffle winners are able to claim voucher codes when contract is settled. You must provide an encrypted list of voucher codes in the file `src/voucherCodes.{NODE_ENV}` (one for each respective environment). To encrypt a list of voucher codes, fire up the frontend with `pnpm dev` and navigate to the `http://localhost:3000/encrypt` page.

## Tests

First, ensure that you have the following environment variables defined (get these from https://www.scorer.gitcoin.co/):

```
GTC_SCORER_API_KEY
GTC_SCORER_ID
```

The rest of the environment variables needed for tests are already included in `.env.test`. Then, to run the tests:

```bash
pnpm test
```
