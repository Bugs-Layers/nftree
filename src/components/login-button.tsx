"use client";

import { ConnectButton } from "thirdweb/react";
import { client } from "~/lib/thirdWebClient";

export default function LoginButton() {
  return (
    <ConnectButton client={client} />
  )
}
