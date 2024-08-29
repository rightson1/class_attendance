"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  sidebar_links,
  sidebar_links_lecture,
  sidebar_links_student,
} from "../utils/sidebar_links";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
const Sidebar = ({
  user_type = "admin",
}: {
  user_type: "lecture" | "admin" | "student";
}) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = React.useState(pathname);
  const [activeLink, setActiveLink] = React.useState("/");
  useEffect(() => {
    setIsActive(pathname);
    setActiveLink(pathname.split("/")[1]);
  }, [pathname]);
  const links =
    user_type === "lecture"
      ? sidebar_links_lecture
      : user_type === "admin"
      ? sidebar_links
      : sidebar_links_student;
  const LinkBtn = ({
    index,
    link,
  }: {
    index: number;
    link: (typeof sidebar_links)[0]["links"][0];
  }) => {
    const active = isActive === link.path;

    return (
      <Button
        variant={active ? "link" : "ghost"}
        key={index}
        className={cn(
          "flex items-center justify-start ",
          active &&
            "gap-1 -ml-2 border-[#8BACFF] text-foreground border-2 rounded-lg "
        )}
        asChild
      >
        <Link href={link.path}>
          <link.icon height={20} width={20} className="mr-2 text-xl " />
          <span className="text-sm font-[500]">{link.name}</span>
        </Link>
      </Button>
    );
  };
  return (
    <div className="h-full w-full bg-card  rounded-md md:border border-border">
      <div className="p-4 ">
        <div className=" text-xl font-bold flex md:hidden py-5">
          <span className="text-yellow-500 ">Farm</span>
          <span>better</span>
        </div>
        <div className="links flex flex-col gap-4">
          {links.map((category, index) => {
            return (
              <div key={index} className="flex flex-col gap-3">
                <h4 className="  font-semibold">{category.type}</h4>
                <div className="flex flex-col ">
                  {category.links.map((link, index) => {
                    return (
                      <>
                        <LinkBtn index={index} link={link} key={index} />
                        <div className="flex flex-col pl-4">
                          {link.links &&
                            link.links.map((subLink, subIndex) => (
                              <LinkBtn
                                index={subIndex}
                                link={subLink}
                                key={subIndex}
                              />
                            ))}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
