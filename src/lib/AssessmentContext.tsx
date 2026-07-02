import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { EMPTY_IDENTITY, type Answers, type Identity } from "./assessment";

const STORAGE_KEY = "studysync-assessment";

interface StoredState {
  identity: Identity;
  answers: Answers;
}

function loadStored(): StoredState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { identity: EMPTY_IDENTITY, answers: {} };
    const parsed = JSON.parse(raw);
    return {
      identity: { ...EMPTY_IDENTITY, ...parsed.identity },
      answers: parsed.answers ?? {},
    };
  } catch {
    return { identity: EMPTY_IDENTITY, answers: {} };
  }
}

interface AssessmentContextValue {
  identity: Identity;
  answers: Answers;
  setIdentity: (identity: Identity) => void;
  setAnswer: (questionId: number, value: boolean) => void;
  reset: () => void;
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [identity, setIdentityState] = useState<Identity>(() => loadStored().identity);
  const [answers, setAnswers] = useState<Answers>(() => loadStored().answers);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ identity, answers }));
  }, [identity, answers]);

  const setIdentity = (next: Identity) => setIdentityState(next);

  const setAnswer = (questionId: number, value: boolean) =>
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

  const reset = () => {
    setIdentityState(EMPTY_IDENTITY);
    setAnswers({});
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AssessmentContext.Provider value={{ identity, answers, setIdentity, setAnswer, reset }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used within AssessmentProvider");
  return ctx;
}
