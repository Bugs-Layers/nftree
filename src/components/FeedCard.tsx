
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { Card, CardHeader, CardContent, CardFooter } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { ArrowUpIcon } from "lucide-react"
import Image from 'next/image'
import UpvoteButton from "./upvote-button"

type FeedCardProps = {
  avatar: string,
  treeId: number,
  username: string
  description: string,
  image: string,
  creation_date: string,
  upvotes: number,
}


export function FeedCard({
  description,
  upvotes,
  treeId,
  image,
  creation_date,
  avatar,
  username }: FeedCardProps) {
  console.log(description)
  return (

    <Card className="border-0 rounded-none shadow-none">
      <CardHeader className="flex flex-row items-center p-3">
        <Link href="#" className="flex items-center gap-2 text-sm font-semibold" prefetch={false}>
          <Avatar className="w-8 h-8 border">
            <AvatarImage src={avatar} alt="profile" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          {username}
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <Image src={image} width={400} height={400} alt="Image" className="object-cover aspect-square" />
      </CardContent>
      <CardFooter className="grid gap-2 p-2 pb-4">
        <UpvoteButton treeId={treeId} />
        <div className=" text-sm w-full grid gap-1.5">
          <div className=" flex gap-2">
            <Link href="#" className="font-medium" prefetch={false}>
              {username}
            </Link>
            {description}{creation_date}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}