import {
  BedDouble,
  ChartNoAxesCombined,
  History,
  LogOut,
  Package,
  PanelRightClose,
  Settings,
  UserCog,
} from "lucide-react";

type SidebarProps = {};

export const Sidebar = ({}: SidebarProps) => {
  return (
    <aside className="w-10 h-full flex items-center justify-between flex-col py-2">
      <div className="flex flex-col gap-6 items-center">
        <PanelRightClose />
        <BedDouble />
        <Package />
        <UserCog />
        <History />
        <ChartNoAxesCombined />
        <Settings />
      </div>

      <LogOut />
    </aside>
  );
};
