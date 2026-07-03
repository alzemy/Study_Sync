import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion, useReducedMotion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ProgressSteps from "../components/ProgressSteps";
import { useAssessment } from "../lib/AssessmentContext";
import { scoreAnswers } from "../lib/assessment";
import { CATEGORY_ICONS } from "../lib/categoryIcons";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Hasil() {
  const { identity, answers } = useAssessment();
  const result = useMemo(() => scoreAnswers(answers), [answers]);
  const reduceMotion = useReducedMotion();

  const chartData = result.perCategory
    .filter((c) => c.yesCount > 0)
    .map((c) => ({
      name: c.category.name,
      value: c.percentage,
      color: c.category.color,
    }));

  const DominantIcon = result.dominant ? CATEGORY_ICONS[result.dominant.id] : null;

  const motionProps = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: "hidden",
          animate: "show",
          variants: fadeUp,
          transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8">
        <ProgressSteps current={3} />
        <div className="mx-auto max-w-2xl">
          <motion.h1
            {...motionProps(0)}
            className="text-center font-display text-2xl font-extrabold sm:text-3xl"
            style={{ color: "var(--color-green-900)" }}
          >
            Hasil Asesmen{identity.nama ? ` ${identity.nama}` : ""}
          </motion.h1>

          {result.totalYes === 0 || !result.dominant ? (
            <motion.div
              {...motionProps(0.1)}
              className="mt-10 rounded-2xl bg-white p-8 text-center shadow-[0_4px_16px_rgba(2,77,40,0.08)]"
            >
              <p className="text-black/80">
                Berdasarkan hasil asesmen, kami tidak menemukan indikasi kesulitan belajar yang
                dominan. Pertahankan kebiasaan belajarmu! Jika tetap ingin berdiskusi, konselor
                kami siap membantu.
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div
                {...motionProps(0.1)}
                className="mt-8 rounded-2xl bg-white p-6 shadow-[0_4px_16px_rgba(2,77,40,0.08)]"
              >
                <div className="mx-auto h-72 w-full max-w-sm">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius="55%"
                        outerRadius="85%"
                        paddingAngle={2}
                        label={({ value }) => `${value}%`}
                        labelLine={false}
                        animationDuration={800}
                        animationEasing="ease-out"
                      >
                        {chartData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="mt-2 flex flex-col gap-2">
                  {result.perCategory
                    .filter((c) => c.yesCount > 0)
                    .map((c) => (
                      <li key={c.category.id} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: c.category.color }}
                          />
                          {c.category.name}
                        </span>
                        <span className="font-bold">{c.percentage}%</span>
                      </li>
                    ))}
                </ul>
              </motion.div>

              <motion.div
                {...motionProps(0.22)}
                className="mt-6 rounded-2xl p-6 text-center"
                style={{ backgroundColor: "var(--color-green-50)" }}
              >
                {DominantIcon && (
                  <span
                    className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: "white" }}
                  >
                    <DominantIcon size={22} color={result.dominant.color} strokeWidth={2.2} />
                  </span>
                )}
                <p
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: "var(--color-green-900)" }}
                >
                  Masalah Paling Dominan
                </p>
                <h2 className="mt-1 font-display text-xl font-extrabold sm:text-2xl">
                  {result.dominant.name}
                </h2>
                <p className="mt-3 text-sm text-black/70">
                  Berdasarkan hasil asesmen yang telah Anda isi, permasalahan yang paling dominan
                  adalah {result.dominant.name}.
                </p>
              </motion.div>

              <motion.div
                {...motionProps(0.34)}
                className="mt-6 rounded-2xl bg-white p-6 shadow-[0_4px_16px_rgba(2,77,40,0.08)]"
              >
                <p className="text-sm text-black/70">{result.dominant.description}</p>
                <p className="mt-2 text-sm font-semibold text-black/85">
                  Yuk, lanjut konsultasikan hasil asesmenmu bersama konselor StudySync untuk
                  mendapatkan interpretasi yang mendalam serta rekomendasi strategi yang sesuai
                  kebutuhanmu.
                </p>
              </motion.div>
            </>
          )}

          <motion.div {...motionProps(0.46)} className="mt-8 text-center">
            <Link to="/konsultasi">
              <Button>Konsultasikan Hasilmu</Button>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
