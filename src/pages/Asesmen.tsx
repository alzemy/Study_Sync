import { useState, type FormEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ProgressSteps from "../components/ProgressSteps";
import { useAssessment } from "../lib/AssessmentContext";
import { EMPTY_IDENTITY, type Identity } from "../lib/assessment";

const WHATSAPP_PATTERN = /^(\+62|62|0)8[0-9]{7,12}$/;

export default function Asesmen() {
  const navigate = useNavigate();
  const { identity, setIdentity } = useAssessment();
  const [form, setForm] = useState<Identity>(identity.nama ? identity : EMPTY_IDENTITY);
  const [errors, setErrors] = useState<Partial<Record<keyof Identity, string>>>({});

  function update<K extends keyof Identity>(key: K, value: Identity[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof Identity, string>> = {};
    if (!form.nama.trim()) next.nama = "Nama wajib diisi";
    if (!form.jenisKelamin) next.jenisKelamin = "Pilih jenis kelamin";
    if (!form.sekolah.trim()) next.sekolah = "Sekolah wajib diisi";
    if (!form.kelas.trim()) next.kelas = "Kelas wajib diisi";
    if (!form.whatsapp.trim()) next.whatsapp = "Nomor WhatsApp wajib diisi";
    else if (!WHATSAPP_PATTERN.test(form.whatsapp.trim().replace(/[\s-]/g, "")))
      next.whatsapp = "Format nomor WhatsApp tidak valid";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIdentity(form);
    navigate("/asesmen/kuesioner");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8">
        <ProgressSteps current={1} />
        <div className="mx-auto max-w-lg">
          <h1 className="text-center font-display text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--color-green-900)" }}>
            Isi Identitas Asesmen
          </h1>
          <p className="mt-3 text-center text-sm text-black/70">
            Selamat datang di StudySync. Sebelum berkonsultasi, silakan mengisi asesmen berikut
            untuk membantu kami memahami kondisi belajar Anda.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
            <Field label="Nama" error={errors.nama}>
              <input
                type="text"
                value={form.nama}
                onChange={(e) => update("nama", e.target.value)}
                placeholder="Nama lengkap"
                className={inputClass(Boolean(errors.nama))}
              />
            </Field>

            <Field label="Jenis Kelamin" error={errors.jenisKelamin}>
              <div className="flex gap-3">
                {(["Laki-laki", "Perempuan"] as const).map((option) => (
                  <label
                    key={option}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-colors"
                    style={{
                      borderColor:
                        form.jenisKelamin === option ? "var(--color-green-900)" : "rgba(2,77,40,0.15)",
                      backgroundColor: form.jenisKelamin === option ? "var(--color-green-50)" : "white",
                    }}
                  >
                    <input
                      type="radio"
                      name="jenisKelamin"
                      value={option}
                      checked={form.jenisKelamin === option}
                      onChange={() => update("jenisKelamin", option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Sekolah" error={errors.sekolah}>
              <input
                type="text"
                value={form.sekolah}
                onChange={(e) => update("sekolah", e.target.value)}
                placeholder="Nama sekolah"
                className={inputClass(Boolean(errors.sekolah))}
              />
            </Field>

            <Field label="Kelas" error={errors.kelas}>
              <select
                value={form.kelas}
                onChange={(e) => update("kelas", e.target.value)}
                className={inputClass(Boolean(errors.kelas))}
              >
                <option value="">Pilih kelas</option>
                {["VII", "VIII", "IX", "X", "XI", "XII"].map((kelas) => (
                  <option key={kelas} value={kelas}>
                    Kelas {kelas}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Nomor WhatsApp" error={errors.whatsapp}>
              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
                placeholder="08xxxxxxxxxx"
                className={inputClass(Boolean(errors.whatsapp))}
              />
            </Field>

            <p className="text-xs text-black/50">
              Data yang kamu isi hanya digunakan untuk keperluan asesmen dan konsultasi dengan
              konselor StudySync.
            </p>

            <Button type="submit" className="mt-2 w-full">
              Lanjut Asesmen
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-black/80">{label}</span>
      {children}
      {error && <span className="text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border-2 bg-white px-4 py-3 text-sm outline-none transition-colors ${
    hasError ? "border-red-400" : "border-black/10 focus:border-[var(--color-green-900)]"
  }`;
}
