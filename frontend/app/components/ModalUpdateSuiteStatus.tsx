import { Suite, SuiteStatus } from "@/shared/types/suite-types";
import { Modal } from "@/shared/ui/Modal";
import {
  Ban,
  BrushCleaning,
  Bubbles,
  Key,
  LockKeyhole,
  ScanEye,
  Scroll,
  Trash2,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { StatusButton } from "./StatusButton";

type ModalUpdateSuiteStatusProps = {
  open?: boolean;
  suite: Suite;
  isUpdating?: boolean;
  onClose?: () => void;
  onUpdate: (status: SuiteStatus) => void;
};

export const ModalUpdateSuiteStatus = ({
  open,
  suite,
  isUpdating,
  onClose,
  onUpdate,
}: ModalUpdateSuiteStatusProps) => {
  const [selectedStatus, setSelectedStatus] = useState<SuiteStatus>(
    suite?.status,
  );
  const statusOptions = [
    {
      label: SuiteStatus.livre,
      icon: <Key size={16} />,
      color: "text-emerald-600",
    },
    {
      label: SuiteStatus.bloqueado,
      icon: <Ban size={16} />,
      color: "text-gray-500",
    },
    {
      label: SuiteStatus.conferencia,
      icon: <ScanEye size={16} />,
      color: "text-yellow-600",
    },
    {
      label: SuiteStatus.faxina,
      icon: <Bubbles size={16} />,
      color: "text-purple-800",
    },
    {
      label: SuiteStatus.fechamento,
      icon: <Scroll size={16} />,
      color: "text-amber-200",
    },
    {
      label: SuiteStatus.limpeza,
      icon: <BrushCleaning size={16} />,
      color: "text-blue-600",
    },
    {
      label: SuiteStatus.locado,
      icon: <LockKeyhole size={16} />,
      color: "text-red-800",
    },
    {
      label: SuiteStatus.manutencao,
      icon: <Wrench size={16} />,
      color: "text-gray-600",
    },
    {
      label: SuiteStatus.sujo,
      icon: <Trash2 size={16} />,
      color: "text-amber-900",
    },
  ];

  const handleSelectStatus = (status: SuiteStatus) => {
    setSelectedStatus(status);
  };

  return (
    <Modal
      size="sm"
      title="Alterar Status"
      subtitle={`Suíte ${suite?.number}`}
      onClose={onClose}
      open={open}
    >
      <div className="flex flex-col gap-2 h-80 overflow-auto">
        {statusOptions.map((option) => {
          return (
            <StatusButton
              key={option.label}
              icon={option.icon}
              color={option.color}
              label={option.label}
              onClick={handleSelectStatus}
              isSelected={selectedStatus === option.label}
            />
          );
        })}
      </div>

      <div className="flex w-full justify-end items-center gap-2">
        <button
          onClick={onClose}
          className="hover:cursor-pointer text-xs border px-3 py-1.5 rounded-lg border-gray-600/30 hover:bg-gray-400/10"
        >
          Cancelar
        </button>
        <button
          disabled={isUpdating}
          onClick={() => onUpdate(selectedStatus)}
          className="flex gap-2 items-center hover:cursor-pointer text-xs px-3 py-1.5 rounded-lg bg-white text-black hover:shadow-lg disabled:opacity-50 disabled:hover:shadow-none transition-shadow"
        >
          {isUpdating ? "Atualizando..." : "Atualizar"}
        </button>
      </div>
    </Modal>
  );
};
