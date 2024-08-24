"use client";

import { useEffect, useState } from "react";
import OnboardingForm from "./OnboardingForm";
// import { pb } from "@/lib/pbClient";
import { useRouter } from "next/navigation";
// import { useUserStore } from "@/lib/stores/user";

function Onboarding({ walletAddress }: { walletAddress: string }) {
  const router = useRouter();
  const [userPresent, setUserPresent] = useState(false);

//   const updateUser = useUserStore((state) => state.updateUser);

  useEffect(() => {
    (async () => {
      try {
        // const result = await pb
        //   .collection("users_table")
        //   .getFirstListItem(`wallet_address="${walletAddress}"`);

        // console.log(result);

        // const user = {
        //   name: result.name,
        //   bio: result.bio,
        //   id: result.id,
        //   walletAddress: result.wallet_address,
        // };

        // // updateUser(user);

        // setUserPresent(true);
        // router.push(`/user/${result.name}`);
      } catch (e) {
        // setUserPresent(false);

        // const { items } = await pb.collection("users_table").getList(1, 20, {
        //   filter: `wallet_address = ${walletAddress}`,
        // });

        // const users = convertToUser(items);

        // setUserPresent(false);
      }
    })();
  });

  return <OnboardingForm walletAddress={walletAddress} />;
}

export default Onboarding;
