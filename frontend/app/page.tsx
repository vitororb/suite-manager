"use client";

import { useGetSuites, useUpdateSuiteStatus } from "@/lib/api/suite.api";
import { Suite, SuiteStatus } from "@/shared/types/suite-types";
import { QueryErrorState } from "@/shared/ui/QueryErrorState";
import { QueryLoadState } from "@/shared/ui/QueryLoadState";
import { useState } from "react";
import { ModalUpdateSuiteStatus } from "./components/ModalUpdateSuiteStatus";
import { SuiteCard } from "./components/SuiteCard";

export default function Home() {
  const { data: suites = [], isLoading, isError } = useGetSuites();
  const { mutate: updateSuiteStatus, isPending } = useUpdateSuiteStatus();

  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSuite(null);
  };

  const handleOpenModal = (suite: Suite) => {
    setSelectedSuite(suite);
    setIsModalOpen(true);
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
            onOpen={() => handleOpenModal(suite)}
          />
        ))}
      </div>

      <ModalUpdateSuiteStatus
        open={isModalOpen}
        onUpdate={handleUpdateStatus}
        onClose={handleCloseModal}
        suite={selectedSuite!}
        isUpdating={isPending}
      />
    </>
  );
}
