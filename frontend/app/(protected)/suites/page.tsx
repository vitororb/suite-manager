"use client";

import { QueryErrorState } from "@/components/QueryErrorState";
import { QueryLoadState } from "@/components/QueryLoadState";
import {
  useGetSuites,
  useUpdateSuiteAlert,
  useUpdateSuiteStatus,
} from "@/services/suite.service";
import { Suite, SuiteStatus } from "@/types/suite-types";
import { useState } from "react";
import { ModalUpdateSuiteAlert } from "./components/ModalUpdateSuiteAlert";
import { ModalUpdateSuiteStatus } from "./components/ModalUpdateSuiteStatus";
import { SuiteCard } from "./components/SuiteCard";

export default function Suites() {
  const { data: suites = [], isLoading, isError } = useGetSuites();
  const { mutate: updateSuiteStatus, isPending: isUpdatingStatus } =
    useUpdateSuiteStatus();
  const { mutate: updateSuiteAlert, isPending: isUpdatingAlert } =
    useUpdateSuiteAlert();

  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null);
  const [openedModal, setOpenedModal] = useState<"status" | "alert" | null>(
    null,
  );

  const handleCloseModal = () => {
    setOpenedModal(null);
    setSelectedSuite(null);
  };

  const handleOpenStatusModal = (suite: Suite) => {
    setSelectedSuite(suite);
    setOpenedModal("status");
  };

  const handleOpenAlertModal = (suite: Suite) => {
    setSelectedSuite(suite);
    setOpenedModal("alert");
  };

  const handleUpdateStatus = (status: SuiteStatus) => {
    if (!selectedSuite) return;

    updateSuiteStatus(
      {
        id: selectedSuite.id,
        status,
      },
      {
        onSuccess: handleCloseModal,
      },
    );
  };

  const handleUpdateAlert = (suite: Suite, alert: string) => {
    if (!suite) return;

    updateSuiteAlert(
      {
        id: suite.id,
        alert,
      },
      {
        onSuccess: handleCloseModal,
      },
    );
  };

  if (isLoading) {
    return <QueryLoadState />;
  }

  if (isError) {
    return <QueryErrorState />;
  }

  return (
    <>
      <div className="flex gap-2">
        {suites.map((suite) => (
          <SuiteCard
            key={suite.id}
            suite={suite}
            onOpenStatusModal={() => handleOpenStatusModal(suite)}
            onAddAlert={() => handleOpenAlertModal(suite)}
            onRemoveAlert={(suite) => handleUpdateAlert(suite, "")}
            isUpdatingAlert={isUpdatingAlert}
          />
        ))}
      </div>

      <ModalUpdateSuiteStatus
        isOpen={openedModal === "status"}
        suite={selectedSuite!}
        onUpdate={handleUpdateStatus}
        onClose={handleCloseModal}
        isUpdating={isUpdatingStatus}
      />

      <ModalUpdateSuiteAlert
        isOpen={openedModal === "alert"}
        suite={selectedSuite!}
        onClose={handleCloseModal}
        onSubmit={(alert) => handleUpdateAlert(selectedSuite!, alert)}
        isUpdating={isUpdatingAlert}
      />
    </>
  );
}
