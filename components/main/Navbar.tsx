import React from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  Settings,
  Bell,
  MoveDownRight,
  ChevronDown,
  User,
  Power,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiSettingsFill } from "react-icons/ri";
import { SideDrawer } from "./SideDrawer";
import { Button } from "../ui/button";
import { NotificationsDrawer } from "./NotificationsDrawer";
import Image from "next/image";
import { useAuth } from "../provider/UserAuth";

const Navbar = () => {
  return (
    <div className="px-4 w-full">
      <div className="bg-card w-full md:px-4 py-2 rounded-lg fbc">
        <div className="flex md:hidden">
          <SideDrawer />
        </div>
        <div className=" text-xl font-bold hidden md:flex uppercase">
          {/* <Image src="/logo.svg" width={150} height={70} alt="logo" /> */}
          Attend <span className="text-yellow-500">anceance</span>
        </div>

        <NavRightSide />
      </div>
    </div>
  );
};

const NavRightSide = () => {
  return (
    <div className="fbc gap-2">
      <div className="fbc">{/* <NotificationsDrawer /> */}</div>
      <UserSettings />
    </div>
  );
};

const UserSettings = () => {
  const { user, logout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="fbc gap-2 px-1">
          <Avatar className="w-8 h-8 ">
            <AvatarImage src={"/face.png"} />
            <AvatarFallback>
              <User size={14} />
            </AvatarFallback>
          </Avatar>
          <div className="fbc gap-4 m-hidden">
            <span className="">{user?.name}</span>
            <ChevronDown size={19} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[170px] cursor-pointer">
        <DropdownMenuItem className="fic gap-2">
          <User size={16} />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="fic gap-2">
          <RiSettingsFill size={16} />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="fic cursor-pointer gap-2" onClick={logout}>
          <Power size={16} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Navbar;
