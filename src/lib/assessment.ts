import { CATEGORIES, QUESTIONS, type Category, type CategoryId } from "../data/questions";

export interface Identity {
  nama: string;
  jenisKelamin: "Laki-laki" | "Perempuan" | "";
  sekolah: string;
  kelas: string;
  whatsapp: string;
}

export const EMPTY_IDENTITY: Identity = {
  nama: "",
  jenisKelamin: "",
  sekolah: "",
  kelas: "",
  whatsapp: "",
};

export type Answers = Record<number, boolean>;

export interface ScoreResult {
  perCategory: { category: Category; yesCount: number; percentage: number }[];
  totalYes: number;
  dominant: Category | null;
}

export function scoreAnswers(answers: Answers): ScoreResult {
  const counts: Record<CategoryId, number> = {
    multitasking: 0,
    digital: 0,
    akademik: 0,
    kebiasaan: 0,
    waktu: 0,
  };

  for (const q of QUESTIONS) {
    if (answers[q.id]) counts[q.category] += 1;
  }

  const totalYes = Object.values(counts).reduce((a, b) => a + b, 0);

  const perCategory = CATEGORIES.map((category) => {
    const yesCount = counts[category.id];
    const percentage = totalYes > 0 ? Math.round((yesCount / totalYes) * 100) : 0;
    return { category, yesCount, percentage };
  });

  let dominant: Category | null = null;
  if (totalYes > 0) {
    dominant = perCategory.reduce((best, current) =>
      current.yesCount > best.yesCount ? current : best
    ).category;
  }

  return { perCategory, totalYes, dominant };
}

export function isIdentityComplete(identity: Identity): boolean {
  return Boolean(
    identity.nama.trim() &&
      identity.jenisKelamin &&
      identity.sekolah.trim() &&
      identity.kelas.trim() &&
      identity.whatsapp.trim()
  );
}

export function isAnswersComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => typeof answers[q.id] === "boolean");
}
