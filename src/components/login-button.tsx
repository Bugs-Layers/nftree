"use client";

import { ConnectButton } from "thirdweb/react";
import { generatePayload, isLoggedIn, login, logout, setWalletAddressCookie } from "~/lib/thirdweb/actions";
import { client } from "~/lib/thirdweb/client";

export default function LoginButton() {
  return (
    <ConnectButton
      client={client}

      auth={{
        isLoggedIn: async (address) => {
          await setWalletAddressCookie(address)
          return await isLoggedIn()
        },
        doLogin: async (params) => {
          await login(params);
        },
        getLoginPayload: async ({ address }) =>
          generatePayload({ address }),
        doLogout: async () => {
          await logout();
        },
      }}
    />
  )
}
