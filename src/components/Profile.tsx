import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import ProfilePageImages from "./ProfilePageImages";
import { BASE_URL, getUserByWalletAddress, getUserPosts, UserResponseType } from "~/client/api";
import { getWalletAddressCookie } from "~/lib/thirdweb/actions";
import { redirect } from "next/navigation";
import { showBalance } from "~/lib/thirdweb/web3";
import Web3Stats from "./web3-stats";

type ProfileProps = {
  avatar: string;
  username: string;
  description: string;
  trees: number;
  carboncredits: number;
}

export default async function Profile({
  avatar,
  username,
  description,
  trees,
  carboncredits,
}: ProfileProps) {
  const wallet = (await getWalletAddressCookie())?.value
  if (!wallet) redirect("/login")

  let user: UserResponseType;
  try {
    user = await getUserByWalletAddress(wallet)
  } catch (e) {
    return <>No users in the db!</>
  }

  const posts = await getUserPosts(user.id)

  return (
    <div className="flex flex-col w-full">
      <div className="bg-[#f5f5f5] dark:bg-black py-8 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
          <div className="relative">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage src={avatar} alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1">
              <CameraIcon className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">
              {user.bio}
            </p>
            <Web3Stats wallet={wallet} />
            {/* <div className="flex items-center justify-center gap-4 mt-4 md:justify-start">
              <div className="flex flex-col items-center">
                <span className="font-bold">{trees}</span>
                <span className="text-sm text-muted-foreground">Trees</span>
              </div>

              <div className="flex flex-col items-center">

                <span className="font-bold">{carbonCredits}</span>
                <span className="text-sm text-muted-foreground">Carbon Credits</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div>
        {posts.map((post) => {
          const [image, ...desc] = post.content.split(" ")

          return (
            <ProfilePageImages key={post.id} image={image ? `${BASE_URL}${image.split("=")[1]}` : "/placeholder.svg"} />
          )
        })}
      </div>
      <br></br>
    </div>
  )
}


function CameraIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}
