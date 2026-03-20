type SuiteInfoRowProps = {
  icon: React.ReactNode;
  label: string;
  time: string;
};

export const SuiteInfoRow = ({ icon, label, time }: SuiteInfoRowProps) => {
  return (
    <div className="flex justify-between items-center font-semibold">
      <div className="text-xs uppercase text-gray-400 flex items-center gap-1">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-sm text-gray-100">{time || "-- : --"}</span>
    </div>
  );
};
