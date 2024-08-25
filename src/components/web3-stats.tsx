"use client"
import React, { useState } from 'react'
import { showBalance } from '~/lib/thirdweb/web3'

export default function Web3Stats({ wallet }: { wallet: string }) {
  const [carbonCredits, setCarbonCredits] = useState<bigint>(() => {
    showBalance("carbonCredit", wallet).then((v) => { setCarbonCredits(v) });
    return BigInt(0);
  })

  const [trees, setTrees] = useState<bigint>(() => {
    showBalance("nftree", wallet).then((v) => { setTrees(v) });
    return BigInt(0)
  })

  return (
    <div className="flex items-center justify-center gap-4 mt-4 md:justify-start">
      <div className="flex flex-col items-center">
        <span className="font-bold">{trees.toString()}</span>
        <span className="text-sm text-muted-foreground">Trees</span>
      </div>

      <div className="flex flex-col items-center">

        <span className="font-bold">{carbonCredits.toString()}</span>
        <span className="text-sm text-muted-foreground">Carbon Credits</span>
      </div>
    </div>
  )
}
