import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ProgressSteps from "../components/ProgressSteps";
import { useAssessment } from "../lib/AssessmentContext";
import { scoreAnswers } from "../lib/assessment";

export default function Hasil() {
  const { identity, answers } = useAssessment();
  const result = useMemo(() => scoreAnswers(answers), [answers]);

  const chartData = result.perCategory
    .filter((c) => c.yesCount > 0)
    .map((c) => ({
      name: c.category.name,
      value: c.percentage,
      color: c.category.color,
    }));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-8">
        <ProgressSteps current={3} />
        <div className="mx-auto max-w-2xl">
          <h1 className="text-center font-display text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--color-green-900)" }}>
            Hasil Asesmen{identity.nama ? ` ${identity.nama}` : ""}
          </h1>

          {result.totalYes === 0 || !result.dominant ? (
            <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-[0_4px_16px_rgba(2,77,40,0.08)]">
              <p className="text-black/80">
                Berdasarkan hasil asesmen, kami tidak menemukan indikasi kesulitan belajar yang
                dominan. Pertahankan kebiasaan belajarmu! Jika tetap ingin berdiskusi, konselor
                kami siap membantu.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-8 rounded-2xl bg-white p-6 shadow-[0_4px_16px_rgba(2,77,40,0.08)]">
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
              </div>

              <div
                className="mt-6 rounded-2xl p-6 text-center"
                style={{ backgroundColor: "var(--color-green-50)" }}
              >
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-green-900)" }}>
                  Masalah Paling Dominan
                </p>
                <h2 className="mt-1 font-display text-xl font-extrabold sm:text-2xl">
                  {result.dominant.name}
                </h2>
                <p className="mt-3 text-sm text-black/70">
                  Berdasarkan hasil asesmen yang telah Anda isi, permasalahan yang paling dominan
                  adalah {result.dominant.name}.
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-white p-6 shadow-[0_4px_16px_rgba(2,77,40,0.08)]">
                <p className="text-sm text-black/70">{result.dominant.description}</p>
                <p className="mt-2 text-sm font-semibold text-black/85">
                  {result.dominant.recommendation}
                </p>
              </div>
            </>
          )}

          <div className="mt-8 text-center">
            <Link to="/konsultasi">
              <Button>Konsultasikan Hasilmu</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
