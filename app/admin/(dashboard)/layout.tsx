"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "@/components/main/ThemeProvider";
import Sidebar from "@/components/main/Sidebar";
import Navbar from "@/components/main/Navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/provider/UserAuth";
import { LoadingUI } from "@/components/main/loadingUI";
const Layout = ({ children }: { children: ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { userIdentity, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!userIdentity) {
      router.push("/auth/login");
    }
    if (userIdentity && user && user.role !== "admin") {
      router.push("/auth/login");
    }
  }, [userIdentity, user]);

  if (!user) {
    return <LoadingUI />;
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      forcedTheme="light"
    >
      <div className="bg-background min-h-screen max-w-screen">
        <div className="sticky bg-card top-0 fc h-[70] md:h-[90px] border-b border-borhder  z-[10]">
          <Navbar />
        </div>
        <div className="bg-background min-h-screen max-w-screen">
          <div
            className="hidden md:flex
             md:w-[250px] md:fixed h-full z-[5] p-2 rounded-md"
          >
            <Sidebar user_type="admin" />
          </div>
          <div className="w-full md:pl-[250px] relative ">
            <div className="z-[2] rpx py-4 md:py-6 ">{children}</div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
