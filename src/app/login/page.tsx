import Image from 'next/image';
import LoginButton from "~/components/login-button";
import Onboarding from '~/components/onboarding';
import { getWalletAddressCookie, isLoggedIn } from '~/lib/thirdweb/actions';

export default async function Page() {
  const loggedIn = await isLoggedIn()
  const walletAddress = (await getWalletAddressCookie())?.value

  return (
    <div className="overflow-y-hidden h-[calc(92vh)]">
      {loggedIn && walletAddress && walletAddress !== "" ? (
        <>
          <Onboarding walletAddress={walletAddress} />
        </>
      ) : (
        <div className="flex justify-center items-center mt-56 mb-10">
          <span className="">Sign in by connecting your Web3 wallet!</span>
        </div>
      )}
      <div className="flex justify-center items-center dark:hidden ">
        <Image src="/login_image.png" alt="login" width={500} height={500} />
      </div>
      <div className="flex justify-center items-center">
        <Image src="/login_image_white.png" alt="login" width={500} height={500} />
      </div>
    </div>
  );
}
