import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ProgressSteps from "../components/ProgressSteps";
import { useAssessment } from "../lib/AssessmentContext";
import { QUESTIONS, type Question } from "../data/questions";
import type { Answers } from "../lib/assessment";

const GROUP_SIZE = 6;
const GROUPS = Math.ceil(QUESTIONS.length / GROUP_SIZE);

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export default function Kuesioner() {
  const navigate = useNavigate();
  const { answers, setAnswer } = useAssessment();
  const [group, setGroup] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();

  const groupQuestions = useMemo(
    () => QUESTIONS.slice(group * GROUP_SIZE, group * GROUP_SIZE + GROUP_SIZE),
    [group]
  );

  const answeredCount = Object.keys(answers).length;
  const groupComplete = groupQuestions.every((q) => typeof answers[q.id] === "boolean");
  const isLastGroup = group === GROUPS - 1;

  function handleNext() {
    if (!groupComplete) return;
    if (isLastGroup) {
      navigate("/hasil");
    } else {
      setDirection(1);
      setGroup((g) => g + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    if (group === 0) {
      navigate("/asesmen");
    } else {
      setDirection(-1);
      setGroup((g) => g - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8">
        <ProgressSteps current={2} />
        <div className="mx-auto max-w-xl">
          <h1
            className="text-center font-display text-2xl font-extrabold sm:text-3xl"
            style={{ color: "var(--color-green-900)" }}
          >
            Kuesioner Asesmen
          </h1>
          <p className="mt-3 text-center text-sm text-black/70">
            Petunjuk: Pilihlah jawaban yang paling sesuai dengan kondisi Anda.
          </p>

          <div className="mt-6">
            <div className="mb-1 flex justify-between text-xs font-semibold text-black/50">
              <span>
                {answeredCount}/{QUESTIONS.length} terjawab
              </span>
              <span>
                Bagian {group + 1} dari {GROUPS}
              </span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--color-green-50)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "var(--color-gold-600)" }}
                animate={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <div className="relative mt-8 overflow-hidden">
            {reduceMotion ? (
              <div className="flex flex-col gap-4">
                {groupQuestions.map((q) => (
                  <QuestionCard key={q.id} question={q} answers={answers} setAnswer={setAnswer} />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={group}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="flex flex-col gap-4"
                    initial="hidden"
                    animate="show"
                    variants={listVariants}
                  >
                    {groupQuestions.map((q) => (
                      <motion.div key={q.id} variants={cardVariants}>
                        <QuestionCard question={q} answers={answers} setAnswer={setAnswer} />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <Button type="button" variant="secondary" onClick={handleBack} className="flex-1">
              Kembali
            </Button>
            <Button type="button" onClick={handleNext} disabled={!groupComplete} className="flex-1">
              {isLastGroup ? "Lihat Hasil Asesmen" : "Lanjut"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function QuestionCard({
  question,
  answers,
  setAnswer,
}: {
  question: Question;
  answers: Answers;
  setAnswer: (questionId: number, value: boolean) => void;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(2,77,40,0.08)]">
      <p className="text-sm font-semibold text-black/85">
        {question.id}. {question.text}
      </p>
      <div className="mt-4 flex gap-3">
        {(["Iya", "Tidak"] as const).map((option) => {
          const value = option === "Iya";
          const selected = answers[question.id] === value;
          return (
            <label
              key={option}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 py-2.5 text-sm font-bold transition-all active:scale-[0.96]"
              style={{
                borderColor: selected ? "var(--color-green-900)" : "rgba(2,77,40,0.15)",
                backgroundColor: selected ? "var(--color-green-900)" : "white",
                color: selected ? "white" : "var(--color-ink-900)",
              }}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                className="sr-only"
                checked={selected}
                onChange={() => setAnswer(question.id, value)}
              />
              {selected && <Check size={14} strokeWidth={3} />}
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
}
