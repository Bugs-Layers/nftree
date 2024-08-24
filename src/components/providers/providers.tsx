"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import ThemeProvider from "./theme-provider";

export default function Providers({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >

        {children}
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};