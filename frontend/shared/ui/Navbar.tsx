import { User } from "lucide-react";
import Image from "next/image";

type NavbarProps = {};

export const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="w-screen h-10 justify-between items-center px-2 flex relative">
      <Image src="/logo.png" alt="Logo" width={24} height={24} />

      <div className="flex absolute items-center gap-2 left-1/2 -translate-x-1/2">
        {
          // TO DO: Add info about the suites
        }
      </div>

      <div className="flex items-center gap-2">
        Bem-vindo, <span className="font-bold">Nome do Colaborador</span>
        <User />
      </div>
    </nav>
  );
};
