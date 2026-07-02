import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ProgressSteps from "../components/ProgressSteps";
import { useAssessment } from "../lib/AssessmentContext";
import { QUESTIONS } from "../data/questions";

const GROUP_SIZE = 6;
const GROUPS = Math.ceil(QUESTIONS.length / GROUP_SIZE);

export default function Kuesioner() {
  const navigate = useNavigate();
  const { answers, setAnswer } = useAssessment();
  const [group, setGroup] = useState(0);

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
      setGroup((g) => g + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    if (group === 0) {
      navigate("/asesmen");
    } else {
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
          <h1 className="text-center font-display text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--color-green-900)" }}>
            Kuesioner Asesmen
          </h1>
          <p className="mt-3 text-center text-sm text-black/70">
            Petunjuk: Pilihlah jawaban yang paling sesuai dengan kondisi Anda.
          </p>

          <div className="mt-6">
            <div className="mb-1 flex justify-between text-xs font-semibold text-black/50">
              <span>{answeredCount}/{QUESTIONS.length} terjawab</span>
              <span>Bagian {group + 1} dari {GROUPS}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "var(--color-green-50)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(answeredCount / QUESTIONS.length) * 100}%`,
                  backgroundColor: "var(--color-gold-600)",
                }}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {groupQuestions.map((q) => (
              <div key={q.id} className="rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(2,77,40,0.08)]">
                <p className="text-sm font-semibold text-black/85">
                  {q.id}. {q.text}
                </p>
                <div className="mt-4 flex gap-3">
                  {(["Iya", "Tidak"] as const).map((option) => {
                    const value = option === "Iya";
                    const selected = answers[q.id] === value;
                    return (
                      <label
                        key={option}
                        className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border-2 py-2.5 text-sm font-bold transition-colors"
                        style={{
                          borderColor: selected ? "var(--color-green-900)" : "rgba(2,77,40,0.15)",
                          backgroundColor: selected ? "var(--color-green-900)" : "white",
                          color: selected ? "white" : "var(--color-ink-900)",
                        }}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          className="sr-only"
                          checked={selected}
                          onChange={() => setAnswer(q.id, value)}
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
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
