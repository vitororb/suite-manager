import { Suite, SuiteStatus } from "@/shared/types/suite-types";
import { format } from "date-fns";
import {
  AlertTriangle,
  Ban,
  BrushCleaning,
  Bubbles,
  Clock4,
  Key,
  LockKeyhole,
  PlusCircle,
  ScanEye,
  Scroll,
  Trash2,
  Wrench,
  X,
} from "lucide-react";
import { SuiteInfoRow } from "./SuiteInfoRow";

type SuiteCardProps = {
  suite: Suite;
  onOpenStatusModal: (suite: Suite) => void;
  onAddAlert: (suite: Suite) => void;
};

const statusMap = {
  [SuiteStatus.livre]: {
    label: SuiteStatus.livre,
    color: "bg-emerald-600 text-emerald-600",
    icon: <Key size={16} />,
  },
  [SuiteStatus.bloqueado]: {
    label: SuiteStatus.bloqueado,
    color: "bg-gray-500 text-gray-500",
    icon: <Ban size={16} />,
  },
  [SuiteStatus.conferencia]: {
    label: SuiteStatus.conferencia,
    color: "bg-yellow-600 text-yellow-600",
    icon: <ScanEye size={16} />,
  },
  [SuiteStatus.faxina]: {
    label: SuiteStatus.faxina,
    color: "bg-purple-800 text-purple-800",
    icon: <Bubbles size={16} />,
  },
  [SuiteStatus.fechamento]: {
    label: SuiteStatus.fechamento,
    color: "bg-amber-200 text-amber-200",
    icon: <Scroll size={16} />,
  },
  [SuiteStatus.limpeza]: {
    label: SuiteStatus.limpeza,
    color: "bg-blue-600 text-blue-600",
    icon: <BrushCleaning size={16} />,
  },
  [SuiteStatus.locado]: {
    label: SuiteStatus.locado,
    color: "bg-red-800 text-red-800",
    icon: <LockKeyhole size={16} />,
  },
  [SuiteStatus.manutencao]: {
    label: SuiteStatus.manutencao,
    color: "bg-gray-600 text-gray-600",
    icon: <Wrench size={16} />,
  },
  [SuiteStatus.sujo]: {
    label: SuiteStatus.sujo,
    color: "bg-amber-900 text-amber-900",
    icon: <Trash2 size={16} />,
  },
};

export const SuiteCard = ({
  suite,
  onOpenStatusModal,
  onAddAlert,
}: SuiteCardProps) => {
  const statusStyle = statusMap[suite.status] ?? {
    label: "Desconhecido",
    color: "bg-gray-400 text-gray-400",
    icon: <AlertTriangle size={16} />,
  };

  return (
    <div className="flex flex-col w-60 h-fit rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className={`flex items-start justify-between w-full p-4 ${statusStyle.color}`}
      >
        {/* Number and Category */}
        <div className="flex flex-col gap-2 text-white">
          <div className="text-4xl font-bold">{suite.number}</div>
          <div className="text-xs font-semibold uppercase">
            {suite.category}
          </div>
        </div>

        {/* Status */}
        <button
          onClick={() => onOpenStatusModal(suite)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-sm font-medium whitespace-nowrap hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {statusStyle.icon}
          {suite.status}
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col w-full bg-[#3D3D3D] gap-3 p-4">
        <SuiteInfoRow
          icon={<Clock4 size={16} />}
          label="Último checkout"
          time={suite.checkOut ? format(suite.checkOut, "HH:mm") : "--:--"}
        />

        <SuiteInfoRow
          icon={<Clock4 size={16} />}
          label="Período"
          time={suite.checkIn ? format(suite.checkIn, "HH:mm") : "--:--"}
        />

        <div className="w-full h-px bg-gray-400" />

        {!suite.alert && (
          <button
            onClick={() => onAddAlert(suite)}
            className="flex text-gray-400 items-center gap-1 cursor-pointer whitespace-nowrap w-full justify-center border rounded-md h-8 hover:text-gray-200 border-dashed"
          >
            <PlusCircle size={16} className="shrink-0" />
            <p className="text-xs font-medium">Adicionar alerta</p>
          </button>
        )}

        {suite.alert && (
          <div className="flex text-red-400 items-center gap-2 whitespace-nowrap border border-red-600/30 rounded-md px-2 h-8 bg-red-600/20">
            <AlertTriangle size={16} className="shrink-0" />
            <p className="w-full text-xs font-medium overflow-hidden">
              {suite.alert}
            </p>
            <X size={12} className="shrink-0 cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};
