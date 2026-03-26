"use client";

import { useGetSuites, useUpdateSuiteStatus } from "@/lib/api/suite.api";
import { Suite, SuiteStatus } from "@/shared/types/suite-types";
import { QueryErrorState } from "@/shared/ui/QueryErrorState";
import { QueryLoadState } from "@/shared/ui/QueryLoadState";
import { useState } from "react";
import { ModalUpdateSuiteAlert } from "./components/ModalUpdateSuiteAlert";
import { ModalUpdateSuiteStatus } from "./components/ModalUpdateSuiteStatus";
import { SuiteCard } from "./components/SuiteCard";

export default function Suites() {
  const { data: suites = [], isLoading, isError } = useGetSuites();
  const { mutate: updateSuiteStatus, isPending } = useUpdateSuiteStatus();
  // const { mutate: updateSuiteAlert, isPending } = useUpdateSuiteAlert();

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
          />
        ))}
      </div>

      <ModalUpdateSuiteStatus
        isOpen={openedModal === "status"}
        suite={selectedSuite!}
        onUpdate={handleUpdateStatus}
        onClose={handleCloseModal}
        isUpdating={isPending}
      />

      <ModalUpdateSuiteAlert
        isOpen={openedModal === "alert"}
        suite={selectedSuite!}
        onClose={handleCloseModal}
      />
    </>
  );
}
