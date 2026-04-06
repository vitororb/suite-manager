"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type TableProps<T> = {
  readonly data: T[];
  readonly columns: ColumnDef<T, any>[];
};

export function Table<T>({ data, columns }: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-1">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="h-10 bg-neutral-950/90">
              {headerGroup.headers.map((header, headerIndex) => (
                <th
                  key={header.id}
                  className="text-xs font-semibold uppercase tracking-wide text-neutral-400 transition-colors hover:bg-neutral-800/70"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="h-12 bg-neutral-900/90 text-neutral-10 transition-colors hover:bg-neutral-800 hover:ring-1 hover:ring-inset hover:ring-neutral-700 text-sm transitions-color"
            >
              {row.getVisibleCells().map((cell, cellIndex) => (
                <td key={cell.id} className="px-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
