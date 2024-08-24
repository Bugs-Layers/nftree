// components/FooterWrapper.js
'use client';

import { usePathname } from 'next/navigation';
import Footer from './footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  const hideFooter = pathname === '/login';

  if (hideFooter) {
    return null;
  }
  
  return <Footer />;
}