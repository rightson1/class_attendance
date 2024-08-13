"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Toaster as Sooner } from "sonner";
import { AuthProvider } from "../provider/UserAuth";
const Client = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Sooner />

        {children}

        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default Client;
