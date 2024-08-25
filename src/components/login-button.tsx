"use client";

import { ConnectButton, useAutoConnect } from "thirdweb/react";
import { createWallet, inAppWallet, Wallet } from "thirdweb/wallets";
import { generatePayload, isLoggedIn, login, logout, setWalletAddressCookie } from "~/lib/thirdweb/actions";
import { client } from "~/lib/thirdweb/client";

let wallet: Wallet

export default function LoginButton() {
  const { data: autoConnected, isLoading } = useAutoConnect({
    client: client,
    onConnect: (w: Wallet) => {
      wallet = w;
    },
    wallets: [
      inAppWallet(),
      createWallet("app.core"),
      createWallet("io.metamask"),
    ],
  });

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
