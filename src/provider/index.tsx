"use client";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";

const queryClient = new QueryClient();

export default function ThemeQueryProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
        <Toaster richColors position="top-right" closeButton />
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
