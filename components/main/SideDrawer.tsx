"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { useAuth } from "../provider/UserAuth";
export const SideDrawer = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Sheet open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 w-[250px] " overlay={false}>
        <Sidebar
          user_type={
            user?.role === "admin"
              ? "admin"
              : user?.role === "student"
              ? "student"
              : "lecture"
          }
        />
      </SheetContent>
    </Sheet>
  );
};
