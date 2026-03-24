import { X } from "lucide-react";

type ModalProps = {
  title: string;
  subtitle?: string;
  size?: ModalSize;
  children?: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
};

type ModalSize = "sm" | "md" | "lg";

export const Modal = ({
  title,
  subtitle,
  size = "md",
  children,
  onClose,
  open,
}: ModalProps) => {
  const sizeMap = {
    sm: "w-1/4",
    md: "w-1/2",
    lg: "w-3/4",
  };

  if (!open) return null;

  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/64">
      <div
        className={`${sizeMap[size]} bg-[#171717] p-4 rounded-lg gap-4 flex flex-col h-fit border border-gray-600/30`}
      >
        {/* Header */}
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col">
            <h2 className="font-semibold text-sm">{title}</h2>
            <span className="text-xs text-gray-400">{subtitle}</span>
          </div>

          <X
            onClick={onClose}
            size={12}
            className="text-gray-400 hover:cursor-pointer hover:text-white"
          />
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};
