import { Hex } from "viem";

export const shortenEthAddress = (address: Hex) => `${address.substring(0, 6)}......${address.substring(address.length - 4)}`
