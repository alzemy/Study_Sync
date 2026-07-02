import { motion, useReducedMotion } from "framer-motion";

interface LeafProps {
  className?: string;
  color?: string;
  size?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
}

/** A single organic leaf shape, echoing the logo's book-into-leaves motif. Purely decorative. */
export function Leaf({
  className = "",
  color = "var(--color-green-500)",
  size = 64,
  rotate = 0,
  duration = 7,
  delay = 0,
}: LeafProps) {
  const reduceMotion = useReducedMotion();

  const svg = (
    <svg viewBox="0 0 64 96" width={size} height={size * 1.5} fill="none" aria-hidden="true">
      <path
        d="M60 4C34 10 14 24 6 46c-6 18-2 34 10 46 12-14 20-30 22-48 2-14 2-27 22-40Z"
        fill={color}
      />
      <path
        d="M16 90C22 66 34 40 58 8"
        stroke="rgba(0,0,0,0.14)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  if (reduceMotion) {
    return (
      <div className={className} style={{ transform: `rotate(${rotate}deg)`, opacity: 0.11 }}>
        {svg}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={{ opacity: 0.11 }}
      initial={{ rotate, y: 0 }}
      animate={{ y: [0, -10, 0], rotate: [rotate, rotate + 3, rotate] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {svg}
    </motion.div>
  );
}

/** Ambient leaf field for section backgrounds. Parent must be `relative overflow-hidden`. */
export function LeafField({ variant = "default" }: { variant?: "default" | "hero" }) {
  if (variant === "hero") {
    return (
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Leaf className="absolute -left-10 -top-4" color="var(--color-green-500)" size={52} rotate={-24} duration={8} />
        <Leaf className="absolute -right-8 top-16" color="var(--color-gold-400)" size={40} rotate={20} duration={6.5} delay={0.6} />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Leaf className="absolute -right-10 top-2" color="var(--color-green-500)" size={44} rotate={-16} duration={7} />
      <Leaf className="absolute -left-10 bottom-2" color="var(--color-gold-400)" size={36} rotate={22} duration={6} delay={0.8} />
    </div>
  );
}
