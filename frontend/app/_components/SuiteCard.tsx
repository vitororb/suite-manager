"use client";

import { SuiteStatus } from "@/shared/enum/suite-status.enum";
import { SuiteTypes } from "@/shared/enum/suite-types.enum";
import { AlertTriangle, Key, MinusCircle, PlusCircle } from "lucide-react";

type SuiteCardProps = {
  category: SuiteTypes;
  status: SuiteStatus;
  lastCheckout: string;
  period: string;
  hasAlert?: string;
};

export const SuiteCard = ({
  category,
  status,
  lastCheckout,
  period,
  hasAlert,
}: SuiteCardProps) => {
  return (
    <div className="flex flex-col w-72 h-fit bg-white gap-3 rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200">
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-2">
          <div className="text-4xl font-bold text-gray-900">01</div>
          <div className="text-xs font-semibold uppercase text-gray-500">
            {category}
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-600 text-base font-medium whitespace-nowrap">
          <Key />
          <span>{status}</span>
        </div>
      </div>

      <div className="h-px bg-gray-200 w-full" />

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">
            Último checkout
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            {lastCheckout}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">Período</span>
          <span className="text-sm text-gray-700 font-semibold">{period}</span>
        </div>
      </div>

      {!hasAlert && (
        <div className="flex text-blue-600 items-center gap-2 pt-3 border-t border-gray-200 cursor-pointer whitespace-nowrap">
          <PlusCircle className="w-4 h-4 shrink-0" />
          <p className="text-xs font-medium">Adicionar alerta</p>
        </div>
      )}

      {hasAlert && (
        <div className="flex text-red-600 items-center justify-between pt-3 border-t border-gray-200 whitespace-nowrap">
          <div className="flex items-center gap-2 animate-pulse">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <p className="text-xs font-medium">{hasAlert}</p>
          </div>
          <MinusCircle className="w-4 h-4 shrink-0 cursor-pointer" />
        </div>
      )}
    </div>
  );
};
