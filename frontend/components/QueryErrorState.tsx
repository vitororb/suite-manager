import { TriangleAlert } from "lucide-react";

export const QueryErrorState = () => {
  return (
    <div className="flex flex-col text-sm text-gray-300 justify-center items-center gap-2 w-full h-full">
      <TriangleAlert />
      Erro ao carregar dados. Tente novamente mais tarde.
    </div>
  );
};
