"use client";
import React from "react";
import { CalendarCheck, MapPin, Pencil, User } from "lucide-react";
import { RiIdCardLine, RiShieldStarFill } from "react-icons/ri";
import { CiMoneyBill, CiUser } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { type ClassValue, clsx } from "clsx";
import { GrHide, GrUserWorker } from "react-icons/gr";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TIcon } from "@/lib/ui_types";
import { IClassWithUnit } from "@/lib/data_types";
import { MdFlightClass } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { FaHourglassEnd, FaHourglassStart } from "react-icons/fa";
import { useEditClass } from "@/lib/hooks/useClass";
import { useCustomToast } from "@/components/atoms/functions";
const FB = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) => (
  <div className={cn("fb w-full py-2 items-center", className)}>{children}</div>
);

const Title = (props: {
  title: string;
  icon?: TIcon;
  btn?: React.ReactNode;
}) => (
  <div className="pt-2">
    <FB>
      <span className="text-grayish text-sm">{props.title}</span>
      {props.icon && (
        <Button size="sm" variant={"secondary"}>
          <props.icon size={16} />
        </Button>
      )}
      {props.btn && props.btn}
    </FB>
    <Separator />
  </div>
);
const Info = (props: {
  icon?: TIcon;
  title: string;
  value?: string | number;
  custom?: React.ReactNode;
}) => {
  return (
    <FB className="text-sm pn py-2">
      <div className="fc gap-2">
        {props.icon && <props.icon size={16} />}
        <span className="">{props.title}</span>
      </div>
      <span className="font-semibold">{props.value}</span>
      {props.custom && props.custom}
    </FB>
  );
};

export const Class_Card = ({
  currentClass,
}: {
  currentClass: IClassWithUnit;
}) => {
  const { mutateAsync: editClass } = useEditClass();
  const { customToast, modalOpen, setModalOpen } = useCustomToast();
  return (
    <div
      className=" bg-card px-4 py-5  h-min w-full
        border rounded-lg border-b "
    >
      <div className="w-full fc pb-10">
        <Avatar className="w-16 h-16">
          <AvatarFallback>
            <MdFlightClass size={24} className="text-primary" />
          </AvatarFallback>
        </Avatar>
      </div>
      <Title
        title="Basic Information"
        btn={
          <Button size="icon" className="h-6 w-6">
            <Pencil size={13} />
          </Button>
        }
      />
      <Info
        icon={RiIdCardLine}
        title="Unit Name"
        value={currentClass.unit.name}
      />
      <Info
        icon={CalendarCheck}
        title="Status"
        custom={<Badge className="capitalize">{currentClass.status}</Badge>}
      />
      <Title title="Class Details" />
      <Info
        icon={RiIdCardLine}
        title="Class Date"
        value={new Date(currentClass.class_date).toDateString()}
      />
      <Info
        icon={FaHourglassStart}
        title="Start Time"
        value={currentClass.start_time}
      />
      <Info
        icon={FaHourglassEnd}
        title="End Time"
        value={currentClass.end_time}
      />

      <Separator />
      <Button
        disabled={!(currentClass.status === "upcoming")}
        variant={"ghost"}
        onClick={() => {
          customToast({
            func: async () => {
              await editClass({
                status: "cancelled",
                _id: currentClass._id,
              });
            },
          });
        }}
        className="fc gap-2 text-destructive my-4"
      >
        <GrHide size={16} />
        <span>Cancel Class</span>
      </Button>
    </div>
  );
};
