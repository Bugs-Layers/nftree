"use client"

import { ArrowUpIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { sendAndConfirmTransaction } from "thirdweb"
import { approveDaily, getTreeApprovals } from "~/lib/thirdweb/rpc/43113/0xdcee2dd10dd46086cc1d2b0825a11ffc990e6eff"
import { nftreeContract } from "~/lib/thirdweb/web3"
import { useActiveAccount } from "thirdweb/react"

export default function UpvoteButton({ treeId }: { treeId: number }) {
  const [upvotes, setUpvotes] = useState<bigint>(() => {
    getTreeApprovals({ tokenId: BigInt(treeId), contract: nftreeContract }).then(res => setUpvotes(res));
    return BigInt(0)
  })

  const activeAccount = useActiveAccount()

  const onUpvote = async () => {
    if (!activeAccount) throw new Error("No active account")

    const reciept = await sendAndConfirmTransaction({
      transaction: approveDaily({
        tokenId: BigInt(treeId),
        contract: nftreeContract,
      }),
      account: activeAccount,
    });

    setUpvotes(prev => prev + BigInt(1))
  }


  return (
    <div className="flex items-center w-full gap-2">
      <Button onClick={onUpvote} variant="ghost" size="default" title="Upvote">
        <ArrowUpIcon className="w-4 h-4" />
      </Button>
      <div>
        <span className="font-medium ">{upvotes.toString()} upvotes</span>
      </div>
    </div>
  )
}
