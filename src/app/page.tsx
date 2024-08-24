import Link from "next/link";
import { FeedPage } from "~/components/component/FeedPage";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import SignOutItem from "~/components/sign-out-item";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default async function HomePage() {
  const user = false;

  return (
    <main className="">
      <MaxWidthWrapper>

       <div><FeedPage/></div>
      </MaxWidthWrapper>
    </main>
  );
}
