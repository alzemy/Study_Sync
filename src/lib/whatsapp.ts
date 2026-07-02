import type { Identity } from "./assessment";

const COUNSELOR_WHATSAPP_NUMBER = "6282245552808";

export function buildWhatsappLink(identity: Identity): string {
  const message = [
    "Halo, Konselor StudySync👋",
    "Saya telah menyelesaikan asesmen dan ingin berkonsultasi mengenai hasil asesmen.",
    `Nama : ${identity.nama}`,
    `Sekolah : ${identity.sekolah}`,
    `Kelas : ${identity.kelas}`,
  ].join("\n");

  return `https://wa.me/${COUNSELOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
