import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ClipboardCheck, BookOpenCheck, MessageCircleHeart } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import { LeafField } from "../components/BrandDecor";
import iconMark from "../assets/icon-mark.png";
import { CATEGORIES } from "../data/questions";
import { CATEGORY_ICONS } from "../lib/categoryIcons";

const OUTCOMES = [
  { icon: ClipboardCheck, text: "Permasalahan belajar yang dialami" },
  { icon: BookOpenCheck, text: "Rekomendasi paket strategi belajar yang sesuai" },
  { icon: MessageCircleHeart, text: "Kesempatan berkonsultasi langsung dengan konselor" },
];

const STEPS = ["Beranda", "Isi Identitas", "Asesmen", "Hasil", "Konsultasi Konselor"];

export default function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative mx-auto max-w-5xl px-4 pb-12 pt-4 text-center sm:pt-8">
          <LeafField variant="hero" />
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5"
          >
            <img src={iconMark} alt="" className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
            <p
              className="font-display text-xs font-bold uppercase tracking-[0.14em]"
              style={{ color: "var(--color-gold-600)" }}
            >
              Selamat Datang di StudySync
            </p>
            <h1 className="max-w-2xl font-display text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl">
              Temukan Penyebab{" "}
              <span style={{ color: "var(--color-green-900)" }}>Kesulitan Belajarmu</span> dan
              Dapatkan Solusi yang Tepat
            </h1>
            <p className="max-w-xl text-base text-black/70 sm:text-lg">
              Mengatasi Kesulitan Belajar Siswa — Lebih Fokus, Terarah, dan Percaya Diri.
            </p>
            <Link to="/asesmen">
              <Button>Mulai Asesmen</Button>
            </Link>
          </motion.div>
        </section>

        {/* Apa itu StudySync */}
        <section className="relative px-4 py-14" style={{ backgroundColor: "var(--color-green-50)" }}>
          <Reveal>
            <div className="mx-auto max-w-5xl text-center">
              <h2
                className="font-display text-2xl font-extrabold sm:text-3xl"
                style={{ color: "var(--color-green-900)" }}
              >
                Apa itu StudySync?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-black/70">
                StudySync adalah layanan asesmen dan konseling yang membantu siswa mengenali
                penyebab kesulitan belajarnya sehingga memperoleh gambaran:
              </p>
              <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-3">
                {OUTCOMES.map(({ icon: Icon, text }, i) => (
                  <Reveal key={text} delay={i * 0.08}>
                    <div className="flex h-full flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-[0_4px_16px_rgba(2,77,40,0.08)]">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-full"
                        style={{ backgroundColor: "var(--color-green-50)" }}
                      >
                        <Icon size={20} color="var(--color-green-900)" strokeWidth={2.2} />
                      </span>
                      <p className="font-medium text-black/80">{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* Masalah yang dibantu */}
        <section className="relative mx-auto max-w-5xl px-4 py-14">
          <LeafField />
          <Reveal>
            <h2
              className="text-center font-display text-2xl font-extrabold sm:text-3xl"
              style={{ color: "var(--color-green-900)" }}
            >
              Masalah yang Kami Bantu Atasi
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((category, i) => {
              const Icon = CATEGORY_ICONS[category.id];
              return (
                <Reveal key={category.id} delay={i * 0.06}>
                  <div className="flex h-full flex-col items-center gap-3 rounded-2xl bg-white p-5 text-center shadow-[0_4px_16px_rgba(2,77,40,0.08)]">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: `color-mix(in srgb, ${category.color} 14%, white)` }}
                    >
                      <Icon size={18} color={category.color} strokeWidth={2.2} />
                    </span>
                    <p className="font-display text-sm font-bold leading-snug">{category.name}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Bagaimana cara kerjanya */}
        <section className="px-4 py-14" style={{ backgroundColor: "var(--color-bg-0)" }}>
          <div className="mx-auto max-w-md">
            <Reveal>
              <h2
                className="text-center font-display text-2xl font-extrabold sm:text-3xl"
                style={{ color: "var(--color-green-900)" }}
              >
                Bagaimana Cara Kerjanya?
              </h2>
            </Reveal>
            <div className="relative mt-10 flex flex-col gap-8">
              <div
                className="absolute left-5 top-5 bottom-5 w-0.5"
                style={{ backgroundColor: "var(--color-green-50)" }}
                aria-hidden="true"
              />
              {STEPS.map((step, index) => (
                <Reveal key={step} delay={index * 0.08} y={10}>
                  <div className="relative flex items-center gap-4">
                    <div
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display font-bold text-white"
                      style={{ backgroundColor: "var(--color-green-900)" }}
                    >
                      {index + 1}
                    </div>
                    <p className="font-semibold text-black/80">{step}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <Reveal>
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
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
