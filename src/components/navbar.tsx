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
    <nav className={cn("h-14 z-[100] w-full transition-all bg-[#f5f5f5]", {
      "sticky top-0": sticky,
    })}>
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between bg-[#f5f5f5]">
          <span className=""><nav className="flex items-center gap-4">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
        </nav></span>
          <ThemeToggle />
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}