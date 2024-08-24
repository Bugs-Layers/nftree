import Link from "next/link";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import SignOutItem from "~/components/sign-out-item";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default async function HomePage() {
  const user = false;

  return (
    <main className="">
      <MaxWidthWrapper>

        <span className="">{user ? "Signed in" : "Signed out"}</span>
        {user ?
          <SignOutItem />
          :
          <Link href="/sign-in" className={cn(buttonVariants({ variant: "link" }), "")}>
            Sign In
          </Link>
        }
      </MaxWidthWrapper>
    </main>
  );
}
