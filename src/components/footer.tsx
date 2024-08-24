import MaxWidthWrapper from "./max-width-wrapper";
import { House, Plus, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Footer() {
  const pathname = usePathname();
  const showFooter = pathname !== '/login';
  return (
    <footer className={`h-20 relative ${showFooter ? '': 'hidden'}`}>
      <MaxWidthWrapper>

        <div className='h-20 fixed sm:sticky bottom-4 right-0  w-full flex flex-col bg-slate-100 dark:bg-black justify-center items-center'> 
             <div className="flex gap-[30vw] dark:bg-black">
                 <Link href={"/home"}> <House  className="dark:text-white" /></Link>
                  <Link href={"/upload"}><Plus className="dark:text-white"/></Link>
                  <Link href={"/profile"}><UserRound className="dark:text-white"/></Link>
             </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}