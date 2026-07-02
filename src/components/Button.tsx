import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export default function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-display font-bold text-base transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const styles =
    variant === "primary"
      ? { backgroundColor: "var(--color-gold-600)", color: "var(--color-ink-900)" }
      : { backgroundColor: "var(--color-green-900)", color: "white" };

  return (
    <button className={`${base} ${className}`} style={styles} {...rest}>
      {children}
    </button>
  );
}
