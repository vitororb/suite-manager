"use client";

import {
  BedDouble,
  ChartNoAxesCombined,
  History,
  LogOut,
  Package,
  Settings,
  UserCog,
} from "lucide-react";
import { useState } from "react";
import { ModalLogout } from "../../ModalLogout";
import { MenuItem } from "./MenuItem";

type SidebarProps = {};

const menuItems = [
  {
    icon: <BedDouble size={20} />,
    label: "Suítes",
    route: "/suites",
  },
  {
    icon: <Package size={20} />,
    label: "Estoque",
    route: "/stock",
  },
  {
    icon: <UserCog size={20} />,
    label: "Usuários",
    route: "/",
  },
  {
    icon: <History size={20} />,
    label: "Histórico",
    route: "/",
  },
  {
    icon: <ChartNoAxesCombined size={20} />,
    label: "Dashboards",
    route: "/",
  },
  {
    icon: <Settings size={20} />,
    label: "Configurações",
    route: "/",
  },
];

export const Sidebar = ({}: SidebarProps) => {
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);

  return (
    <>
      <aside className="w-11 flex items-center justify-between flex-col py-2 shrink-0 bg-foreground border-r border-white/10">
        <div className="flex flex-col gap-2">
          {menuItems.map((menu) => (
            <MenuItem
              key={menu.label}
              icon={menu.icon}
              label={menu.label}
              route={menu.route}
            />
          ))}
        </div>

        <MenuItem icon={<LogOut size={20} />} label="Sair" route="/login" />
      </aside>

      <ModalLogout
        isOpen={isModalLogoutOpen}
        onClose={() => setIsModalLogoutOpen(false)}
      />
    </>
  );
};
