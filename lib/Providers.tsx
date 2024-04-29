"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

type ProvidersProps = {
  props: ThemeProviderProps;
  children: React.ReactNode;
};

export function Providers({ props, children }: ProvidersProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 300000,
      },
    },
  });

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider themes={['pink', 'dark']} {...props}>{children}</NextThemesProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
