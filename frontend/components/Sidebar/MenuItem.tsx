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
      className={`relative inline-block p-1.5 rounded-md hover:bg-[#3D3D3D] text-gray-500 hover:text-white hover:cursor-pointer
          ${pathname === route ? "bg-[#3D3D3D] text-white" : ""}`}
      onClick={() => redirect(route)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {icon}

      {isVisible && (
        <div className="absolute bg-[#3D3D3D] text-xs text-white px-3 font-medium py-1.5 rounded-md shadow-lg whitespace-nowrap top-1/2 transform -translate-y-1/2 left-full ml-1">
          {label}
        </div>
      )}
    </button>
  );
};
