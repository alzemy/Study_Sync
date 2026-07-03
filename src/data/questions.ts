export type CategoryId =
  | "multitasking"
  | "digital"
  | "akademik"
  | "kebiasaan"
  | "waktu";

export interface Category {
  id: CategoryId;
  name: string;
  color: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "multitasking",
    name: "Gangguan Fokus Akibat Multitasking",
    color: "var(--color-green-900)",
    description:
      "Kamu cenderung mengerjakan banyak hal sekaligus sehingga fokus terpecah.",
  },
  {
    id: "digital",
    name: "Distraksi Teknologi Digital",
    color: "var(--color-gold-600)",
    description:
      "Perangkat digital sering mengambil alih waktu dan konsentrasi belajarmu.",
  },
  {
    id: "akademik",
    name: "Tekanan Akademik Berlebih",
    color: "var(--color-brown-700)",
    description:
      "Beban dan tekanan akademik membuatmu lelah, cemas, atau kehilangan semangat.",
  },
  {
    id: "kebiasaan",
    name: "Pola Kebiasaan Belajar",
    color: "var(--color-green-500)",
    description: "Kebiasaan belajarmu belum terbentuk secara konsisten.",
  },
  {
    id: "waktu",
    name: "Pengelolaan Waktu Belajar Buruk",
    color: "var(--color-gold-400)",
    description: "Waktu belajarmu belum terkelola secara efektif.",
  },
];

export interface Question {
  id: number;
  category: CategoryId;
  text: string;
}

export const QUESTIONS: Question[] = [
  // Kategori 1 — Gangguan Fokus Akibat Multitasking (Q1-Q6)
  { id: 1, category: "multitasking", text: "Saya sering mengerjakan beberapa tugas belajar secara bersamaan" },
  { id: 2, category: "multitasking", text: "Saya sulit mempertahankan fokus pada satu tugas hingga selesai" },
  { id: 3, category: "multitasking", text: "Saya sering berpindah dari satu tugas ke tugas lain saat belajar" },
  { id: 4, category: "multitasking", text: "Konsentrasi saya mudah terpecah oleh aktivitas lain" },
  { id: 5, category: "multitasking", text: "Saya merasa hasil belajar menurun karena melakukan banyak hal sekaligus" },
  { id: 6, category: "multitasking", text: "Saya sering berhenti belajar untuk mengerjakan hal lain yang kurang penting" },
  // Kategori 2 — Distraksi Teknologi Digital (Q7-Q12)
  { id: 7, category: "digital", text: "Saya sering membuka media sosial saat sedang belajar" },
  { id: 8, category: "digital", text: "Notifikasi dari perangkat digital mengganggu konsentrasi belajar saya" },
  { id: 9, category: "digital", text: "Saya lebih tertarik menggunakan gadget daripada belajar" },
  { id: 10, category: "digital", text: "Saya sulit menghentikan penggunaan perangkat digital saat belajar" },
  { id: 11, category: "digital", text: "Waktu belajar saya sering berkurang karena aktivitas digital" },
  { id: 12, category: "digital", text: "Saya sering mengecek ponsel tanpa alasan penting saat belajar" },
  // Kategori 3 — Tekanan Akademik Berlebih / stres & burnout (Q13-Q18)
  { id: 13, category: "akademik", text: "Saya merasa terbebani oleh banyaknya tugas akademik" },
  { id: 14, category: "akademik", text: "Saya sering merasa lelah karena tekanan belajar" },
  { id: 15, category: "akademik", text: "Saya merasa cemas terhadap hasil belajar atau nilai akademik" },
  { id: 16, category: "akademik", text: "Saya kehilangan semangat belajar karena tekanan akademik" },
  { id: 17, category: "akademik", text: "Saya merasa jenuh saat sedang belajar" },
  { id: 18, category: "akademik", text: "Saya kesulitan dalam menjalani pembelajaran karena tekanan yang tinggi" },
  // Kategori 4 — Pola Kebiasaan Belajar (Q19-Q24)
  { id: 19, category: "kebiasaan", text: "Saya belajar hanya ketika ada ujian atau tugas" },
  { id: 20, category: "kebiasaan", text: "Saya tidak memiliki jadwal belajar yang teratur" },
  { id: 21, category: "kebiasaan", text: "Saya sering menunda untuk mulai belajar" },
  { id: 22, category: "kebiasaan", text: "Saya jarang mengulang materi setelah pembelajaran selesai" },
  { id: 23, category: "kebiasaan", text: "Saya belajar tanpa target yang jelas" },
  { id: 24, category: "kebiasaan", text: "Saya sering belajar secara terburu-buru" },
  // Kategori 5 — Pengelolaan Waktu Belajar Buruk (Q25-Q30)
  { id: 25, category: "waktu", text: "Saya sering kehabisan waktu saat mengerjakan tugas" },
  { id: 26, category: "waktu", text: "Saya kesulitan menentukan prioritas belajar" },
  { id: 27, category: "waktu", text: "Saya sering menunda tugas hingga mendekati batas waktu" },
  { id: 28, category: "waktu", text: "Saya merasa waktu belajar saya tidak digunakan secara efektif" },
  { id: 29, category: "waktu", text: "Saya kesulitan menyeimbangkan waktu belajar dengan aktivitas lain" },
  { id: 30, category: "waktu", text: "Saya sering merasa tidak cukup waktu untuk menyelesaikan kewajiban belajar" },
];
