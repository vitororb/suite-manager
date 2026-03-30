import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center rounded-2xl bg-[#171717] p-6 gap-7 border-t-4 border-b-4 border-neutral-600/20 w-sm">
      <div className="flex items-center justify-center p-2 rounded-2xl shadow-lg bg-gray-600/10">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
      </div>

      <div className="flex flex-col gap-1 items-center text-center w-full">
        <h2 className="text-xl font-medium">Bem-vindo de volta!</h2>
        <span className="text-sm text-neutral-500">
          Faça login para acessar sua conta.
        </span>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Input
          type="email"
          leftIcon={<Mail size={16} />}
          label="Email"
          placeholder="Digite seu email"
        />
        <Input
          type={showPassword ? "text" : "password"}
          leftIcon={<Lock size={16} />}
          label="Senha"
          placeholder="Digite sua senha"
          rightIcon={
            showPassword ? (
              <EyeOff
                size={16}
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              />
            ) : (
              <Eye
                size={16}
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              />
            )
          }
        />
      </div>

      <div className="flex w-full justify-end">
        <Button onClick={() => redirect("/")}>
          <div className="flex items-center gap-1">
            Entrar
            <LogIn size={16} />
          </div>
        </Button>
      </div>
    </div>
  );
};
