"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Bell, User, X } from "lucide-react";
export const NotificationsDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell height={20} width={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        closeBtn={false}
        className="w-[300px] bg-card  overflow-y-auto"
        overlay={false}
      >
        <SheetHeader>
          <div className="fbc">
            <SheetTitle>Notifications?</SheetTitle>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                setOpen(false);
              }}
            >
              <X size={20} />
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

interface IProps {
  icon: any;
  action: string;
  time: string;
}
