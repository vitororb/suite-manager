"use client";

import { redirect, usePathname } from "next/navigation";
import { useState } from "react";

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  route: string;
};

export const MenuItem = ({ icon, label, route }: MenuItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  return (
    <button
      className={`relative w-8 h-8 flex items-center justify-center rounded-sm hover:text-white hover:cursor-pointer
          ${pathname === route ? "bg-white/5 border border-white/10 text-white" : ""}`}
      onClick={() => redirect(route)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {icon}

      {pathname === route && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r w-0.5 h-4 bg-primary" />
      )}

      {isVisible && (
        <div className="absolute bg-foreground/90 border-white/10 border text-xs text-white px-3 font-medium py-1.5 rounded-md shadow-lg whitespace-nowrap top-1/2 transform -translate-y-1/2 left-full ml-1">
          {label}
        </div>
      )}
    </button>
  );
};
