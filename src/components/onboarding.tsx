import React, { useEffect, useState } from "react";
import OnboardingForm from "./onboarding-form";
import { isLoggedIn } from "~/lib/thirdweb/actions";
import { getUserByWalletAddress } from "~/client/api";
import { redirect } from "next/navigation";

async function Onboarding({ walletAddress }: { walletAddress: string }) {
  const userPresentInDb = async () => {
    try {
      return await getUserByWalletAddress(walletAddress)
      // if (userPresentInDb) redirect("/")
    } catch (e) {
      console.error(e)
    }
  }

  if (await userPresentInDb()) {
    redirect("/")
  }
  else
    return <OnboardingForm walletAddress={walletAddress} />
}

export default Onboarding;