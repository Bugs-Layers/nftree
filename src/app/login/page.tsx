import { Button } from "~/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
export default function page() {
  return (
    <div className="overflow-y-hidden h-screen">
    <div className="flex justify-center items-center m-0 absolute top-[50%] translate-y-[-50%] translate-x-[237%] h-screen">
      <Button asChild className="" >
        <Link href="/login">Login</Link>
      </Button>
    </div>
    <div className="flex justify-center items-center top-[100%] translate-y-[150%] dark:hidden ">
        <Image src="/login_image.png" alt="login" width={500} height={500}  />
    </div>
    <div className="flex justify-center items-center top-[100%] translate-y-[150%]">
        <Image src="/login_image_white.png" alt="login" width={500} height={500}  />
    </div>
    </div>
  );
}
