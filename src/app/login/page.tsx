import { Button } from "~/components/ui/button";
import Link from "next/link";
export default function page() {
  return (
    <div className="flex justify-center items-center m-0 absolute top-[50%] translate-y-[-50%] translate-x-[237%] h-screen">
      <Button asChild className="" >
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}
