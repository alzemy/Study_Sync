import iconMark from "../assets/icon-mark.png";

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/5 py-8 px-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center">
        <img src={iconMark} alt="" className="h-8 w-8 object-contain" />
        <p className="font-display text-sm font-bold" style={{ color: "var(--color-green-900)" }}>
          StudySync
        </p>
        <p className="max-w-xs text-xs text-black/60">
          Mengatasi Kesulitan Belajar Siswa — Lebih Fokus, Terarah, dan Percaya Diri
        </p>
        <p className="text-xs text-black/40">&copy; {new Date().getFullYear()} StudySync</p>
      </div>
    </footer>
  );
}
