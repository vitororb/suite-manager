import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Suite } from "@/types/suite-types";
import { useState } from "react";

type ModalUpdateSuiteAlertProps = {
  suite: Suite;
  isOpen: boolean;
  isUpdating: boolean;
  onClose: () => void;
  onSubmit: (alert: string) => void;
};

export const ModalUpdateSuiteAlert = ({
  suite,
  isOpen,
  isUpdating,
  onClose,
  onSubmit,
}: ModalUpdateSuiteAlertProps) => {
  const [alert, setAlert] = useState("");

  return (
    <Modal
      title="Adicionar Alerta"
      subtitle={`Suíte ${suite?.number}`}
      size="md"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Input
        placeholder="Digite o alerta"
        value={alert ?? ""}
        onChange={(e) => setAlert(e.target.value)}
      />

      <div className="flex w-full justify-end items-center gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            onClose();
            setAlert("");
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          disabled={!alert.trim()}
          onClick={() => {
            onSubmit(alert);
            setAlert("");
          }}
        >
          {isUpdating ? "Adicionando..." : "Adicionar"}
        </Button>
      </div>
    </Modal>
  );
};
