import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAssessment } from "../lib/AssessmentContext";
import { buildWhatsappLink } from "../lib/whatsapp";

const COUNSELORS = [
  { name: "Silvia Dwi", initials: "SD", color: "var(--color-green-900)" },
  { name: "Putri Lilla", initials: "PL", color: "var(--color-gold-600)" },
];

export default function Konsultasi() {
  const { identity } = useAssessment();
  const link = buildWhatsappLink(identity);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--color-green-900)" }}>
            Konsultasi Konselor
          </h1>
          <p className="mt-3 text-sm text-black/70">
            Ingin mengetahui hasil asesmen lebih mendalam? Hubungi konselor StudySync untuk
            mendapatkan penjelasan dan pendampingan yang tepat.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {COUNSELORS.map((counselor) => (
              <div
                key={counselor.name}
                className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-[0_4px_16px_rgba(2,77,40,0.08)] sm:flex-row sm:text-left"
              >
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-lg font-extrabold text-white"
                  style={{ backgroundColor: counselor.color }}
                >
                  {counselor.initials}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
                    Konselor
                  </p>
                  <p className="font-display text-lg font-extrabold">{counselor.name}</p>
                </div>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-sm font-bold text-white transition-transform active:scale-95"
                  style={{ backgroundColor: "var(--color-whatsapp)" }}
                >
                  <WhatsappIcon />
                  Konsultasi via WhatsApp
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-black/50">
            Kamu akan diarahkan ke aplikasi WhatsApp dengan pesan yang sudah terisi otomatis.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.51 2 12.04 2Zm0 18.02h-.01a8.1 8.1 0 0 1-4.14-1.14l-.3-.18-3.11.82.83-3.03-.19-.31a8.08 8.08 0 0 1-1.24-4.29c0-4.48 3.65-8.13 8.15-8.13 2.17 0 4.21.85 5.75 2.39a8.07 8.07 0 0 1 2.38 5.75c0 4.48-3.65 8.12-8.12 8.12Zm4.46-6.09c-.24-.12-1.45-.71-1.67-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.96-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.85.83-.85 2.03s.87 2.36 1 2.52c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}
