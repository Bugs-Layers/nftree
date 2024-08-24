import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { cn } from "~/lib/utils";
import { Toaster } from "~/components/ui/sonner";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import Providers from "~/components/providers/providers";
import { constructMetadata } from "~/config/metadata";

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          GeistSans.variable,
        )}
      >
        <Providers>
          <main className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1 flex-grow">{children}</div>
            <Footer />
          </main>
        </Providers>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
