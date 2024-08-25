import { redirect } from "next/navigation";
import { FeedPage } from "~/components/component/FeedPage";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import Profile from "~/components/Profile"
import { isLoggedIn } from "~/lib/thirdweb/actions";

async function Page() {
  const userIsLoggedIn = await isLoggedIn();
  if (!userIsLoggedIn) redirect("/login")

  return (
    <main className="">
      <MaxWidthWrapper>

        <div><FeedPage /></div>
      </MaxWidthWrapper>
    </main>
  );
}

export default Page