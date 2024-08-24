import { FeedPage } from "~/components/component/FeedPage";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import Profile from "~/components/Profile"

function page() {
  return (
    <main className="">
      <MaxWidthWrapper>

       <div><FeedPage/></div>
      </MaxWidthWrapper>
    </main>
  );
}

export default page