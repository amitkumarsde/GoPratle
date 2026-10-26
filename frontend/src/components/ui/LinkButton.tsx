import { ReactNode } from "react";
import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function LinkButton({ href, children, variant = "primary" }: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClass(variant)}>
      {children}
    </Link>
  );
}
