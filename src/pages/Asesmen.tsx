import { useState, type FormEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ProgressSteps from "../components/ProgressSteps";
import { useAssessment } from "../lib/AssessmentContext";
import { EMPTY_IDENTITY, type Identity } from "../lib/assessment";

const WHATSAPP_PATTERN = /^(\+62|62|0)8[0-9]{7,12}$/;

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function Asesmen() {
  const navigate = useNavigate();
  const { identity, setIdentity } = useAssessment();
  const [form, setForm] = useState<Identity>(identity.nama ? identity : EMPTY_IDENTITY);
  const [errors, setErrors] = useState<Partial<Record<keyof Identity, string>>>({});
  const [shake, setShake] = useState(false);
  const reduceMotion = useReducedMotion();

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
    if (!validate()) {
      setShake(true);
      return;
    }
    setIdentity(form);
    navigate("/asesmen/kuesioner");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8">
        <ProgressSteps current={1} />
        <div className="mx-auto max-w-lg">
          <h1
            className="text-center font-display text-2xl font-extrabold sm:text-3xl"
            style={{ color: "var(--color-green-900)" }}
          >
            Isi Identitas Asesmen
          </h1>
          <p className="mt-3 text-center text-sm text-black/70">
            Selamat datang di StudySync. Sebelum berkonsultasi, silakan mengisi asesmen berikut
            untuk membantu kami memahami kondisi belajar Anda.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className={`mt-8 flex flex-col gap-5 ${shake ? "animate-shake" : ""}`}
            onAnimationEnd={() => setShake(false)}
            initial={reduceMotion ? undefined : "hidden"}
            animate={reduceMotion ? undefined : "show"}
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          >
            <motion.div variants={fieldVariants}>
              <Field label="Nama" htmlFor="nama" error={errors.nama}>
                <input
                  id="nama"
                  type="text"
                  value={form.nama}
                  onChange={(e) => update("nama", e.target.value)}
                  placeholder="Nama lengkap"
                  className={inputClass(Boolean(errors.nama))}
                />
              </Field>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <fieldset className="flex flex-col gap-1.5">
                <legend className="mb-1.5 text-sm font-semibold text-black/80">
                  Jenis Kelamin
                </legend>
                <div className="flex gap-3">
                  {(["Laki-laki", "Perempuan"] as const).map((option) => {
                    const selected = form.jenisKelamin === option;
                    return (
                      <label
                        key={option}
                        className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all active:scale-[0.98]"
                        style={{
                          borderColor: selected ? "var(--color-green-900)" : "rgba(2,77,40,0.15)",
                          backgroundColor: selected ? "var(--color-green-50)" : "white",
                        }}
                      >
                        <input
                          type="radio"
                          name="jenisKelamin"
                          value={option}
                          checked={selected}
                          onChange={() => update("jenisKelamin", option)}
                          className="sr-only"
                        />
                        {selected && <Check size={15} strokeWidth={3} color="var(--color-green-900)" />}
                        {option}
                      </label>
                    );
                  })}
                </div>
                {errors.jenisKelamin && (
                  <span className="text-xs font-medium text-red-600">{errors.jenisKelamin}</span>
                )}
              </fieldset>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <Field label="Sekolah" htmlFor="sekolah" error={errors.sekolah}>
                <input
                  id="sekolah"
                  type="text"
                  value={form.sekolah}
                  onChange={(e) => update("sekolah", e.target.value)}
                  placeholder="Nama sekolah"
                  className={inputClass(Boolean(errors.sekolah))}
                />
              </Field>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <Field label="Kelas" htmlFor="kelas" error={errors.kelas}>
                <select
                  id="kelas"
                  value={form.kelas}
                  onChange={(e) => update("kelas", e.target.value)}
                  className={inputClass(Boolean(errors.kelas))}
                >
                  <option value="">Pilih kelas</option>
                  {["VII", "VIII", "IX"].map((kelas) => (
                    <option key={kelas} value={kelas}>
                      Kelas {kelas}
                    </option>
                  ))}
                </select>
              </Field>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <Field label="Nomor WhatsApp" htmlFor="whatsapp" error={errors.whatsapp}>
                <input
                  id="whatsapp"
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className={inputClass(Boolean(errors.whatsapp))}
                />
              </Field>
            </motion.div>

            <motion.p variants={fieldVariants} className="text-xs text-black/50">
              Data yang kamu isi hanya digunakan untuk keperluan asesmen dan konsultasi dengan
              konselor StudySync.
            </motion.p>

            <motion.div variants={fieldVariants}>
              <Button type="submit" className="mt-2 w-full">
                Lanjut Asesmen
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-black/80">
        {label}
      </label>
      {children}
      {error && <span className="text-xs font-medium text-red-600">{error}</span>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border-2 bg-white px-4 py-3 text-sm outline-none transition-all focus:shadow-[0_0_0_4px_rgba(2,77,40,0.1)] ${
    hasError ? "border-red-400" : "border-black/10 focus:border-[var(--color-green-900)]"
  }`;
}
