import { ReactNode } from "react";

type Variant = "primary" | "secondary";

// Shared styles so buttons and button-looking links look the same
export function buttonClass(variant: Variant = "primary") {
  const style = variant === "primary" ? "bg-brand text-white hover:bg-brand-dark" : "bg-brand-light text-brand hover:bg-brand-light-hover";
  return `inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 font-medium disabled:cursor-not-allowed disabled:opacity-60 ${style}`;
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
}

export default function Button({ children, onClick, variant = "primary", disabled }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={buttonClass(variant)}>
      {children}
    </button>
  );
}
