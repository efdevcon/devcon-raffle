# Devcon Ticket Sale System

## Running Hardhat node
Change directory to `packages/contracts` and execute:
```shell
pnpm node:run
```
This will start a Hardhat node, deploy the contracts and place initial bids using the first twenty auto-generated accounts.

## Custom tasks
A number of custom Hardhat tasks were defined to aid testing.

### Managing local node
- `pnpm node:increase-time [--value <INT>]` - increase block time by *value* seconds, defaults to six hour
- `pnpm node:accounts` - print a list of available accounts

### Interacting with AuctionRaffle contract

#### Hardhat
- `pnpm hardhat:bid --account <STRING> --amount <STRING>` - using *account* place bid of *amount* ETH
- `pnpm hardhat:bid-random --amount <INT> [--account <INT>]` - using randomly generated accounts place *amount* of bids using funds from account with index *account* (defaults to `0`)
- `pnpm hardhat:settle-auction` - settle auction
- `pnpm hardhat:settle-raffle` - settle raffle using random numbers
- `pnpm hardhat:settle` - increase time, settle auction and raffle

#### Arbitrum Rinkeby
- `pnpm rinkeby:generate-dotenv [--path <STRING>] [--count <INT>]` - generate .env file needed for other tasks, *path* - output path, *count* - number of private keys to generate
- `pnpm rinkeby:transfer-ether` - transfer ether from `DEPLOYER` to `PRIVATE_KEYS` accounts
- `pnpm rinkeby:init-bids` - place initial bids using `PRIVATE_KEYS` accounts

#### Ethereum Mainnet
- `pnpm ethereum:generate-random-numbers --blocks <ARRAY> --secret <STRING>` - generate random numbers for raffle settlement, *blocks* - array of block numbers from which extract block hash (e.g. "[1234, 5678]"), *secret* - secret number represented as 32 bytes hex string

