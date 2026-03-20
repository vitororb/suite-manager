"use client";

import { useGetSuites } from "@/lib/api/suites/queries";
import { QueryErrorState } from "@/shared/ui/QueryErrorState";
import { QueryLoadState } from "@/shared/ui/QueryLoadState";
import { SuiteCard } from "./SuiteCard";

type Props = {};

export const SuiteList = ({}: Props) => {
  const { data: suites = [], isLoading, isError } = useGetSuites();

  if (isLoading) {
    return <QueryLoadState />;
  }

  if (isError) {
    return <QueryErrorState />;
  }

  return (
    <div className="flex gap-2">
      {suites.map((suite) => (
        <SuiteCard
          key={suite.id}
          id={suite.id}
          number={suite.number}
          category={suite.category}
          status={suite.status}
          lastCheckout={suite.lastCheckout}
          period={suite.period}
          hasAlert={suite.alert}
        />
      ))}
    </div>
  );
};
