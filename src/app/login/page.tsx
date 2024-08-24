import { Button } from "~/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
export default function page() {
  return (
    <div className="overflow-y-hidden h-[calc(92vh)]">
    <div className="flex justify-center items-center mt-56 mb-10">
      <Button asChild className="" >
        <Link href="/login">Login</Link>
      </Button>
    </div>
    <div className="flex justify-center items-center dark:hidden ">
        <Image src="/login_image.png" alt="login" width={500} height={500}  />
    </div>
    <div className="flex justify-center items-center">
        <Image src="/login_image_white.png" alt="login" width={500} height={500}  />
    </div>
    </div>
  );
}
