import Onboarding from "~/components/Onboarding"
import Profile from "~/components/Profile"

function page() {
  return (
    <div>
      <Profile avatar={"placeholder-user.jpg"} username={"John Doe"} description={"I am a software engineer who loves building cool stuff with code."} trees={100} carboncredits={290} />
      <Onboarding walletAddress={"htf hfhfr"}/>
    </div>
  )
}

export default page