import { avalancheFuji } from 'thirdweb/chains';
import { getContract } from "thirdweb";
import { balanceOf as nftreeBalance } from "./rpc/43113/0xdcee2dd10dd46086cc1d2b0825a11ffc990e6eff";
import { balanceOf as carbonCreditBalance } from "./rpc/43113/0xcd109d51c3afd7ed5abc9b8d4254624b82798337";
import { client } from './client';

export const carbonCreditContract = getContract({
  client: client,
  chain: avalancheFuji,
  address: "0xcD109d51C3AfD7Ed5aBC9b8d4254624b82798337",
});

export const nftreeContract = getContract({
  client: client,
  chain: avalancheFuji,
  address: "0xdcEE2dD10dD46086cc1D2B0825A11fFC990e6Eff",
});

export async function showBalance(
  contractName: "carbonCredit" | "nftree",
  walletAddress: string
) {
  if (contractName === "nftree") {
    const result = await nftreeBalance({
      owner: walletAddress,
      contract: nftreeContract,
    });

    return result;
  } else {
    const result = await carbonCreditBalance({
      account: walletAddress,
      contract: carbonCreditContract,
    });
    return result;
  }
}
