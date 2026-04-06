"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { QueryErrorState } from "@/components/QueryErrorState";
import { QueryLoadState } from "@/components/QueryLoadState";
import { Table } from "@/components/Table";
import { useGetStock } from "@/services/stock.service";
import { Search } from "lucide-react";
import { stockColumns } from "./components/stock-columns";

export default function StockPage() {
  const { data: stock = [], isLoading, isError } = useGetStock();

  if (isLoading) {
    return <QueryLoadState />;
  }

  if (isError) {
    return <QueryErrorState />;
  }

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="flex gap-2">
        <Input placeholder="Buscar" leftIcon={<Search size={16} />} />
        <Button>Adicionar</Button>
      </div>
      <Table data={stock} columns={stockColumns} />
    </div>
  );
}
