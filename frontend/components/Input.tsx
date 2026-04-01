import { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = ({
  label,
  error,
  className,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-0.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm text-neutral-500">
          {label}
        </label>
      )}

      <div className="flex items-center gap-2 h-10 rounded-lg px-2 w-full bg-[#0a0a0a] border border-gray-600/30">
        {leftIcon && <span className="text-gray-400">{leftIcon}</span>}

        <input
          {...props}
          id={id}
          className={`w-full text-sm focus:outline-none
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            `}
        />

        {rightIcon && <span className="text-gray-400">{rightIcon}</span>}
      </div>

      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};
