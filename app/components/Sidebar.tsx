import React, { useCallback } from "react";
import type { IconType } from "react-icons/lib/esm/iconBase";
import { Link, NavLink } from "@remix-run/react";
import { AiFillDashboard } from "react-icons/ai";
import { MdLocalMovies } from "react-icons/md";
import { GiTicket, GiDirectorChair } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
type Props = {};

type SidebarItem = {
  title: string;
  Icon: IconType;
  href: string;
};
const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    Icon: AiFillDashboard,
    href: "",
  },
  {
    title: "Movies",
    Icon: MdLocalMovies,
    href: "movies",
  },
  {
    title: "Tv Series",
    Icon: GiTicket,
    href: "series",
  },

  {
    title: "Genres",
    Icon: MdCategory,
    href: "genres",
  },

  {
    title: "Directors",
    Icon: GiDirectorChair,
    href: "directors",
  },

  {
    title: "Actors",
    Icon: FaUserAlt,
    href: "actors",
  },
];

export default function Sidebar({}: Props) {
  return (
    <div className="container fixed h-full w-72 bg-slate-800  py-6 text-white">
      {sidebarItems.map(({ Icon, href, title }, index) => (
        <NavLink
          to={href}
          key={`${title}-${index}`}
          className={({ isActive }) =>
            `mb-2 flex items-center space-x-4 py-2 px-4 text-gray-300 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
          end
        >
          <Icon />
          <p className="text-md font-semibold">{title}</p>
        </NavLink>
      ))}
    </div>
  );
}
