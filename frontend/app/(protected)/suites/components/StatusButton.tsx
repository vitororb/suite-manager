import { SuiteStatus } from "@/types/suite.types";

type StatusButtonProps = {
  label: SuiteStatus;
  color: string;
  icon?: React.ReactNode;
  onClick: (label: SuiteStatus) => void;
  isSelected?: boolean;
};

export const StatusButton = ({
  icon,
  color,
  label,
  isSelected = false,
  onClick,
}: StatusButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      aria-pressed={isSelected}
      className={`flex w-full gap-2 px-3 py-4 rounded-lg hover:cursor-pointer items-center border transition-colors ${
        isSelected
          ? "border-white/60 bg-gray-400/10"
          : "border-gray-600/30 hover:bg-gray-400/10"
      }`}
    >
      <div
        className={`w-3 h-3 border rounded-full ${
          isSelected ? "bg-white border-white" : "border-gray-600/30"
        }`}
      />

      <div className={`${color}`}>{icon}</div>

      <span className="text-sm">{label}</span>
    </button>
  );
};
