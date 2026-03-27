import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: React.ReactNode;
};

const variantMap = {
  primary: "bg-white text-black hover:shadow-lg",
  secondary: "border border-gray-600/30 hover:bg-gray-400/10 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

export const Button = ({
  variant = "primary",
  // size = "sm",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${variantMap[variant]} text-sm px-3 py-1.5 rounded-lg hover:cursor-pointer disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed transition-colors`}
      {...rest}
    >
      {children}
    </button>
  );
};
