import {
  BedDouble,
  ChartNoAxesCombined,
  History,
  LogOut,
  Package,
  Settings,
  UserCog,
} from "lucide-react";
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
    route: "/",
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
  return (
    <aside className="w-10 h-full flex items-center justify-between flex-col py-2">
      <div className="flex flex-col gap-2 items-center">
        {/* <PanelRightClose /> */}

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
  );
};
