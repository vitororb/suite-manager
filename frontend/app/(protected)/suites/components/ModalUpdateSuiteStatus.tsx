import { Suite, SuiteStatus } from "@/shared/types/suite-types";
import { Button } from "@/shared/ui/Button";
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
import { useEffect, useState } from "react";
import { StatusButton } from "./StatusButton";

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

type ModalUpdateSuiteStatusProps = {
  isOpen?: boolean;
  suite: Suite;
  isUpdating?: boolean;
  onClose?: () => void;
  onUpdate: (status: SuiteStatus) => void;
};

export const ModalUpdateSuiteStatus = ({
  isOpen,
  suite,
  isUpdating,
  onClose,
  onUpdate,
}: ModalUpdateSuiteStatusProps) => {
  const [selectedStatus, setSelectedStatus] = useState<SuiteStatus | null>(
    null,
  );

  const handleSelectStatus = (status: SuiteStatus) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    if (!isOpen) return;
    setSelectedStatus(null);
  }, [isOpen, suite?.id]);

  return (
    <Modal
      size="md"
      title="Alterar Status"
      subtitle={`Suíte ${suite?.number}`}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="flex flex-col gap-2 h-80 overflow-auto">
        {statusOptions
          .filter((option) => option.label !== suite?.status)
          .map((option) => {
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
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>

        <Button
          variant="primary"
          onClick={() => onUpdate(selectedStatus!)}
          disabled={isUpdating || !selectedStatus}
        >
          {isUpdating ? "Atualizando..." : "Atualizar"}
        </Button>
      </div>
    </Modal>
  );
};
