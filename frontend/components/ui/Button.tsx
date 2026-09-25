import React from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: React.ReactNode;
};

const variantMap = {
  primary: "bg-primary text-white hover:shadow-lg",
  secondary: "border border-gray-600/30 hover:bg-gray-400/10 text-white",
};

export const Button = ({
  variant = "primary",
  // size = "sm",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${variantMap[variant]} text-xs px-3 py-1.5 rounded-lg hover:cursor-pointer disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed transition-colors`}
      {...rest}
    >
      {children}
    </button>
  );
};
