'use client';
import MaxWidthWrapper from "./max-width-wrapper";  
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const showFooter = pathname !== '/login';
  return (
    <footer className={`h-20 relative ${showFooter ? '': 'hidden'}`}>
      <MaxWidthWrapper>

        <div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center'>
          FOOTER
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}