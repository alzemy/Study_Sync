import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export default function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-display font-bold text-base transition-all duration-200 active:scale-95 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(2,77,40,0.2)] disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer";

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
