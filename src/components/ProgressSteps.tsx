import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

const STEPS = ["Identitas", "Asesmen", "Hasil"];

export default function ProgressSteps({ current }: { current: 1 | 2 | 3 }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto mb-8 flex w-full max-w-md items-center justify-center gap-2 px-4">
      {STEPS.map((label, index) => {
        const step = index + 1;
        const isActive = step === current;
        const isDone = step < current;
        return (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div className="flex flex-1 flex-col items-center gap-1">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300"
                style={{
                  backgroundColor: isDone || isActive ? "var(--color-green-900)" : "var(--color-green-50)",
                  color: isDone || isActive ? "white" : "var(--color-green-900)",
                }}
              >
                {reduceMotion ? (
                  isDone ? "✓" : step
                ) : (
                  <AnimatePresence mode="wait" initial={false}>
                    {isDone ? (
                      <motion.span
                        key="done"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        ✓
                      </motion.span>
                    ) : (
                      <span key="num">{step}</span>
                    )}
                  </AnimatePresence>
                )}
              </div>
              <span
                className="text-[11px] font-semibold transition-colors duration-300"
                style={{ color: isActive ? "var(--color-green-900)" : "rgba(32,32,32,0.5)" }}
              >
                {label}
              </span>
            </div>
            {step < STEPS.length && (
              <div
                className="mb-4 h-0.5 flex-1 overflow-hidden"
                style={{ backgroundColor: "var(--color-green-50)" }}
              >
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: "var(--color-green-900)" }}
                  initial={false}
                  animate={{ width: isDone ? "100%" : "0%" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
