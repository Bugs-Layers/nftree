"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import ThemeProvider from "./theme-provider";
import { CameraProvider } from "../ui/camera/camera-provider";

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

        <CameraProvider>{children}</CameraProvider>
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};