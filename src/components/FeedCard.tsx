
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { Card,CardHeader, CardContent, CardFooter } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { ArrowUpIcon } from "lucide-react"

type FeedCardProps = {
  avatar: string,
  username: string
  description: string,
  image: string,
  creation_date: string,
  upvotes: number,
}


export function FeedCard({
  description,
  upvotes,
  image,
  creation_date,
  avatar,
  username}:FeedCardProps) {
    return (

<Card className="border-0 rounded-none shadow-none">
        <CardHeader className="flex flex-row items-center p-3">
              <Link href="#" className="flex items-center gap-2 text-sm font-semibold" prefetch={false}>
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                {username}
              </Link>
            </CardHeader>
          <CardContent className="p-0">
            <img src="/placeholder.svg" width={400} height={400} alt="Image" className="object-cover aspect-square" />
          </CardContent>
          <CardFooter className="grid gap-2 p-2 pb-4">
            <div className="flex items-center w-full gap-2">
              <Button variant="ghost" size="default"  title="Upvote">
                <ArrowUpIcon className="w-4 h-4"/>
      
              </Button>
              <div>
                <span className="font-medium ">{upvotes} upvotes</span>
              </div>
            </div>
            <div className=" text-sm w-full grid gap-1.5">
              <div className=" flex gap-2">
                <Link href="#" className="font-medium" prefetch={false}>
                  john
                </Link>
                Wow, this photo is absolutely stunning! 😍✨
              </div>
              
              
            </div>
          </CardFooter>
        </Card>
    )
}