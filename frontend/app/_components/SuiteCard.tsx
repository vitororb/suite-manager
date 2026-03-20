"use client";

import { SuiteStatus } from "@/shared/enum/suite-status.enum";
import { SuiteTypes } from "@/shared/enum/suite-types.enum";
import { AlertTriangle, Clock4, Key, PlusCircle, X } from "lucide-react";
import { SuiteInfoRow } from "./SuiteInfoRow";

type SuiteCardProps = {
  number: string;
  category: SuiteTypes;
  status: SuiteStatus;
  lastCheckout: string;
  period: string;
  hasAlert?: string;
};

export const SuiteCard = ({
  number,
  category,
  status,
  lastCheckout,
  period,
  hasAlert,
}: SuiteCardProps) => {
  return (
    <div className="flex flex-col w-60 h-fit rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between w-full p-4 bg-emerald-600">
        {/* Number and Category */}
        <div className="flex flex-col gap-2 text-white">
          <div className="text-4xl font-bold">{number}</div>
          <div className="text-xs font-semibold uppercase">{category}</div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-emerald-600 text-sm font-medium whitespace-nowrap">
          <Key size={16} />
          <span>{status}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col w-full bg-[#3D3D3D] gap-3 p-4">
        <SuiteInfoRow
          icon={<Clock4 size={16} />}
          label="Último checkout"
          time={lastCheckout}
        />

        <SuiteInfoRow
          icon={<Clock4 size={16} />}
          label="Período"
          time={period}
        />

        <div className="w-full h-px bg-gray-400" />

        {!hasAlert && (
          <button className="flex text-gray-400 items-center gap-1 cursor-pointer whitespace-nowrap w-fit h-8 hover:text-gray-200 hover:underline">
            <PlusCircle size={16} className="shrink-0" />
            <p className="text-xs font-medium">Adicionar alerta</p>
          </button>
        )}

        {hasAlert && (
          <div className="flex text-red-400 items-center gap-2 whitespace-nowrap border border-red-600/30 rounded-md px-2 h-8 bg-red-600/20">
            <AlertTriangle size={16} className="shrink-0" />
            <p className="w-full text-xs font-medium">{hasAlert}</p>
            <X size={12} className="shrink-0 cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};
