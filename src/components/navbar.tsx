import { cn } from "~/lib/utils";
import MaxWidthWrapper from "./max-width-wrapper";
import { ThemeToggle } from "./theme-toggle";
import Image from 'next/image';


export default function Navbar({
  sticky = false
}: {
  sticky?: boolean
}) {
  return (
    <nav className={cn("h-[calc(8vh)] z-[10] w-full transition-all bg-[#f5f5f5] dark:bg-black", {
      "sticky top-0": sticky,
    })}>
      <MaxWidthWrapper>
        <div className="flex h-full w-full items-center justify-between bg-[#f5f5f5] dark:bg-black">
          <span className="ml-5">
          <div className="flex justify-center items-center dark:hidden absolute">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
          </div>
          <div className="flex justify-center items-center absolute">
            <Image src="/logo_inverted.png" alt="logo" width={40} height={40} />
          </div>
          </span>
          <ThemeToggle />
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
