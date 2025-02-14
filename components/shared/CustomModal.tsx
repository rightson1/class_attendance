"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { DialogDescription } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { type ClassValue, clsx } from "clsx";
export const CustomModal = ({
  title,
  children,
  trigger,
  onSubmit,
  modalOpen,
  setModalOpen,
  disableSubmit = false,
  footer,
  description,
  dContentStyles,
}: {
  title: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  trigger: React.ReactNode;
  modalOpen?: boolean;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  disableSubmit?: boolean;
  footer?: React.ReactNode;
  description?: string;
  dContentStyles?: ClassValue;
}) => {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(modalOpen || false);
    if (disableSubmit) {
      setOpen(false);
    }
  }, [modalOpen, disableSubmit]);
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className={cn(
          "max-w-[90vw] mb:w-[90vw] rounded-lg p-4 md:p-0",
          dContentStyles
        )}
        close={false}
      >
        <form
          onSubmit={onSubmit}
          className=" mb:max-h-[80vh] 
    max-h-[90vh] rounded-md md:p-4 flex flex-col"
        >
          <DialogHeader className="border-b pb-4">
            <div className="fb">
              <h4 className="h3">{title}</h4>
              <DialogClose asChild>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  <IoClose className="text-xl" />
                </Button>
              </DialogClose>
            </div>
            <DialogDescription className="text-sm">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto flex-grow px-2 py-5">{children}</div>
          <DialogFooter className="border-t pt-4 mb:flex-row mb:justify-end">
            {footer}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
