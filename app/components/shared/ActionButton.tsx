import { Link } from "@remix-run/react";
import type { RemixLinkProps } from "@remix-run/react/dist/components";
import React from "react";

type Props = {
  label: string;
  className?: string;
  type?: "default" | "danger" | "gray";
  to: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
};

type ActionButtonProps = Props;

export default function ActionButton({
  label,
  className,
  type = "default",
  to,
  onClick,
}: ActionButtonProps) {
  let baseClasses =
    "text-md rounded-full   px-3 py-1 font-bold text-white text-center";

  if (type === "default") {
    baseClasses += "  bg-blue-500 hover:bg-blue-700";
  } else if (type === "danger") {
    baseClasses += " bg-red-500 hover:bg-red-700";
  } else if (type === "gray") {
    baseClasses += " bg-gray-700 hover:bg-gray-900";
  }

  return (
    <Link onClick={onClick} to={to} className={`${baseClasses} ${className}`}>
      {label}
    </Link>
  );
}
