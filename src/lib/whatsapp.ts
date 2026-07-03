import type { Identity } from "./assessment";

const COUNSELOR_WHATSAPP_NUMBER = "6282245552808";

export function buildWhatsappLink(identity: Identity, dominantCategory?: string): string {
  const lines = [
    "Halo, Konselor StudySync👋",
    "Saya telah menyelesaikan asesmen dan ingin berkonsultasi mengenai hasil asesmen.",
    `Nama : ${identity.nama}`,
    `Sekolah : ${identity.sekolah}`,
    `Kelas : ${identity.kelas}`,
  ];

  if (dominantCategory) {
    lines.push(`Hasil dominan : ${dominantCategory}`);
  }

  return `https://wa.me/${COUNSELOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
