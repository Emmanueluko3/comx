"use client";
import { useState } from "react";
import { PAGES } from "../utils/constants";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiChartLineUp } from "react-icons/pi";
import { BsSuitcaseLg } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { FaRegFile } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import Logo from "./common/Logo";
import { usePathname } from "next/navigation";

/* eslint-disable  @typescript-eslint/no-unused-vars */
const SideNav = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  const links = [
    {
      icon: LuLayoutDashboard,
      text: "Overview",
      href: PAGES.dashboard.overview,
    },
    {
      icon: PiChartLineUp,
      text: "Market",
      href: PAGES.dashboard.market,
    },
    {
      icon: BsSuitcaseLg,
      text: "Portfolio",
      href: PAGES.dashboard.portfolio,
    },
    {
      icon: LuUsers,
      text: "Community",
      href: PAGES.dashboard.community,
    },
    {
      icon: FaRegFile,
      text: "Reports",
      href: PAGES.dashboard.reports,
    },
    {
      icon: IoSettingsOutline,
      text: "Settings",
      href: PAGES.dashboard.settings,
    },
  ];

  return (
    <div
      className={`top-0 left-0 h-full bg-primary text-white transition-all duration-300 bg-gradient-to-b from-gray-700 to-gray-900 ${
        isExpanded ? "w-full" : "w-16"
      }`}
      // onMouseEnter={() => setIsExpanded(true)}
      // onMouseLeave={() => setIsExpanded(true)}
    >
      <div
        className={`flex flex-col justify-between h-full ${
          isExpanded ? "p-8" : ""
        }`}
      >
        <Logo />
        <ul className="flex flex-col gap-3 mb-auto">
          {links.map((link, index) => {
            /* eslint-disable  @typescript-eslint/no-explicit-any */

            const Icon: any = link.icon;
            return (
              <li key={index}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-4 text-sm rounded-md hover:text-primary-500 transition-all py-2.5 p-2 ${
                    pathname.startsWith(link.href)
                      ? " bg-gray-750 text-primary-500"
                      : "text-gray-500"
                  } ${isExpanded ? "" : "justify-center"}`}
                >
                  <Icon className="text-lg" />

                  {isExpanded && (
                    <span className="text-gray-200">{link.text}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
