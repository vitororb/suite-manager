import { X } from "lucide-react";

type ModalSize = "sm" | "md" | "lg";

type ModalProps = {
  title: string;
  subtitle?: string;
  size?: ModalSize;
  children?: React.ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
};

const sizeMap = {
  sm: "w-1/4",
  md: "w-1/2",
  lg: "w-3/4",
};

export const Modal = ({
  title,
  subtitle,
  size = "md",
  children,
  onClose,
  isOpen = false,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/64">
      <div
        className={`${sizeMap[size]} bg-[#171717] p-4 rounded-lg gap-4 flex flex-col h-fit border border-gray-600/30`}
      >
        {/* Header */}
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col">
            <h2 className="font-semibold text-sm">{title}</h2>
            {subtitle && (
              <span className="text-xs text-gray-400">{subtitle}</span>
            )}
          </div>

          <button onClick={onClose}>
            <X
              size={12}
              className="text-gray-400 hover:cursor-pointer hover:text-white"
            />
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};
