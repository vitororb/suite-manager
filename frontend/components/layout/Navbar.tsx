import { User } from "lucide-react";
import Image from "next/image";

type NavbarProps = {};

export const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="w-screen min-h-11 justify-between items-center px-2.5 flex relative bg-foreground border-b border-white/10">
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="Logo" width={24} height={24} />
        <span className="uppercase tracking-widest text-xs font-semibold">
          Bland Motel
        </span>
      </div>

      {/* TODO: Add info about the suites
      <div className="flex absolute items-center gap-2 left-1/2 -translate-x-1/2"></div> */}

      <div className="flex items-center gap-2 text-sm">
        <p>Bem-vindo,</p>
        <span className="font-bold text-white">Nome do Colaborador</span>
        <div className="rounded-full flex items-center justify-center w-8 h-8 bg-white/5 border border-white/10">
          <User width={16} />
        </div>
      </div>
    </nav>
  );
};
