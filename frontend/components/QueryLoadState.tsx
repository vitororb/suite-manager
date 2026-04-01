import { LoaderCircle } from "lucide-react";

export const QueryLoadState = () => {
  return (
    <div className="flex flex-col text-sm text-gray-300 justify-center items-center gap-2 w-full h-full">
      <LoaderCircle className="animate-spin" />
      Carregando Dados...
    </div>
  );
};
