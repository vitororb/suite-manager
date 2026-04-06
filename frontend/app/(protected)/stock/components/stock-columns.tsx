import { Stock } from "@/types/stock.types";
import { ColumnDef } from "@tanstack/react-table";
import { PencilLine, SquarePlus, Trash2 } from "lucide-react";

export const stockColumns: ColumnDef<Stock>[] = [
  {
    accessorKey: "code",
    header: "Código",
    cell: ({ row }) => {
      const value = row.getValue<string>("code");
      return (
        <span className="flex justify-center font-semibold text-neutral-500">
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "productName",
    header: "Produto",
    cell: ({ row }) => {
      const { productName, productType } = row.original;
      return (
        <div className="flex flex-col">
          <span>{productName}</span>
          <span className="text-xs font-medium text-neutral-500">
            {productType}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "brand",
    header: "Marca",
  },
  {
    accessorKey: "quantity",
    header: "Em Estoque",
    cell: ({ row }) => {
      const { quantity, minimumStock } = row.original;
      const isBelowMinimum = quantity < minimumStock;
      return (
        <span
          className={`flex justify-center font-semibold ${
            isBelowMinimum ? "text-red-500" : "text-neutral-500"
          }`}
        >
          {quantity}
        </span>
      );
    },
  },
  {
    accessorKey: "costPrice",
    header: "Preço",
    cell: ({ row }) => {
      const value = row.getValue<number>("costPrice");
      return (
        <p className="flex justify-center gap-1">
          <span className="font-semibold text-neutral-500">R$ </span> {value}
        </p>
      );
    },
  },
  {
    accessorKey: "minimumStock",
    header: "Estoque Mínimo",
    cell: ({ row }) => {
      const value = row.getValue<number>("minimumStock");
      return <span className="flex justify-center">{value.toString()}</span>;
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: () => {
      return (
        <div className="flex gap-4 justify-center text-neutral-500">
          <SquarePlus
            size={16}
            className="hover:text-neutral-100 hover:cursor-pointer"
          />
          <PencilLine
            size={16}
            className="hover:text-blue-600 hover:cursor-pointer"
          />
          <Trash2
            size={16}
            className="hover:text-red-500 hover:cursor-pointer"
          />
        </div>
      );
    },
  },
];
