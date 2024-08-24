import { cn } from "~/lib/utils";
import MaxWidthWrapper from "./max-width-wrapper";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar({
  sticky = false
}: {
  sticky?: boolean
}) {
  return (
    <nav className={cn("h-14 z-[100] w-full transition-all", {
      "sticky top-0": sticky,
    })}>
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <span className="">NAVBAR</span>
          <ThemeToggle />
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}