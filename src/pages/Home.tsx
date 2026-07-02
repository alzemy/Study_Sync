import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import logo from "../assets/logo-transparent.png";
import { CATEGORIES } from "../data/questions";

const OUTCOMES = [
  "Permasalahan belajar yang dialami",
  "Rekomendasi paket strategi belajar yang sesuai",
  "Kesempatan berkonsultasi langsung dengan konselor untuk mendapatkan pendampingan yang tepat",
];

const STEPS = [
  "Beranda",
  "Isi Identitas",
  "Asesmen",
  "Hasil",
  "Konsultasi Konselor",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 pb-14 pt-6 text-center sm:pt-10">
          <img src={logo} alt="StudySync" className="w-full max-w-md" />
          <p
            className="font-display text-sm font-bold uppercase tracking-wide"
            style={{ color: "var(--color-gold-600)" }}
          >
            Selamat Datang di StudySync
          </p>
          <h1 className="max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Temukan Penyebab{" "}
            <span style={{ color: "var(--color-green-900)" }}>Kesulitan Belajarmu</span>{" "}
            dan Dapatkan Solusi yang Tepat
          </h1>
          <p className="max-w-xl text-base text-black/70 sm:text-lg">
            Mengatasi Kesulitan Belajar Siswa — Lebih Fokus, Terarah, dan Percaya Diri.
          </p>
          <Link to="/asesmen">
            <Button>Mulai Asesmen</Button>
          </Link>
        </section>

        {/* Apa itu StudySync */}
        <section className="px-4 py-14" style={{ backgroundColor: "var(--color-green-50)" }}>
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--color-green-900)" }}>
              Apa itu StudySync?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-black/70">
              StudySync adalah layanan asesmen dan konseling yang membantu siswa mengenali
              penyebab kesulitan belajarnya sehingga memperoleh gambaran:
            </p>
            <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
              {OUTCOMES.map((outcome) => (
                <div
                  key={outcome}
                  className="rounded-2xl bg-white p-6 text-left shadow-[0_4px_16px_rgba(2,77,40,0.08)]"
                >
                  <p className="font-medium text-black/80">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Masalah yang dibantu */}
        <section className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-center font-display text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--color-green-900)" }}>
            Masalah yang Kami Bantu Atasi
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="flex flex-col gap-3 rounded-2xl bg-white p-5 text-center shadow-[0_4px_16px_rgba(2,77,40,0.08)]"
              >
                <span
                  className="mx-auto h-2 w-10 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <p className="font-display text-sm font-bold leading-snug">{category.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bagaimana cara kerjanya */}
        <section className="px-4 py-14" style={{ backgroundColor: "var(--color-bg-0)" }}>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-display text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--color-green-900)" }}>
              Bagaimana Cara Kerjanya?
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-5">
              {STEPS.map((step, index) => (
                <div key={step} className="flex flex-col items-center gap-2 text-center">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full font-display font-bold text-white"
                    style={{ backgroundColor: "var(--color-green-900)" }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm font-semibold text-black/80">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-4 py-16 text-center" style={{ backgroundColor: "var(--color-green-900)" }}>
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            Siap Mengenali Kesulitan Belajarmu?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">
            Mulai asesmen sekarang dan dapatkan gambaran lengkap tentang cara belajarmu.
          </p>
          <div className="mt-8">
            <Link to="/asesmen">
              <Button>Mulai Asesmen</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
