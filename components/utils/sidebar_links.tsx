import { Home } from "lucide-react";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { TSidebarLinks } from "@/lib/ui_types";
import { GiClassicalKnowledge } from "react-icons/gi";
import { MdAcUnit } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
export const sidebar_links: TSidebarLinks = [
  {
    type: "Attendance",
    links: [
      {
        name: "Dashboard",
        icon: Home,
        path: "/admin",
      },
    ],
  },
  {
    type: "Management",
    links: [
      {
        name: "Units",
        icon: MdAcUnit,
        path: "/admin/units",
      },
    ],
  },
  {
    type: "Users",
    links: [
      {
        name: "Students",
        icon: PiStudent,
        path: "/admin/students",
      },
      {
        name: "Lectures",
        icon: FaChalkboardTeacher,
        path: "/admin/lectures",
      },
    ],
  },
  // {
  //   type: "Setup",
  //   links: [
  //     {
  //       name: "User Settings",
  //       icon: IoMdSettings,
  //       path: "/professions",
  //     },
  //   ],
  // },
];

export const sidebar_links_lecture: TSidebarLinks = [
  {
    type: "Home",
    links: [
      {
        name: "Dashboard",
        icon: Home,
        path: "/lecture",
      },
    ],
  },
  {
    type: "Tables",
    links: [
      {
        name: "Units",
        icon: MdAcUnit,
        path: "/lecture/units",
      },
      {
        name: "Classes",
        icon: GiClassicalKnowledge,
        path: "/lecture/classes",
      },
    ],
  },
];

export const sidebar_links_student: TSidebarLinks = [
  {
    type: "Home",
    links: [
      {
        name: "Dashboard",
        icon: Home,
        path: "/student",
      },
    ],
  },
  {
    type: "Tables",
    links: [
      {
        name: "Units",
        icon: MdAcUnit,
        path: "/student/units",
      },
    ],
  },
];
