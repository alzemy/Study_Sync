import type { ReactElement } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Asesmen from "./pages/Asesmen";
import Kuesioner from "./pages/Kuesioner";
import Hasil from "./pages/Hasil";
import Konsultasi from "./pages/Konsultasi";
import { useAssessment } from "./lib/AssessmentContext";
import { isAnswersComplete, isIdentityComplete } from "./lib/assessment";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";

function RequireIdentity({ children }: { children: ReactElement }) {
  const { identity } = useAssessment();
  if (!isIdentityComplete(identity)) return <Navigate to="/asesmen" replace />;
  return children;
}

function RequireAnswers({ children }: { children: ReactElement }) {
  const { identity, answers } = useAssessment();
  if (!isIdentityComplete(identity)) return <Navigate to="/asesmen" replace />;
  if (!isAnswersComplete(answers)) return <Navigate to="/asesmen/kuesioner" replace />;
  return children;
}

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/asesmen" element={<PageTransition><Asesmen /></PageTransition>} />
          <Route
            path="/asesmen/kuesioner"
            element={
              <RequireIdentity>
                <PageTransition>
                  <Kuesioner />
                </PageTransition>
              </RequireIdentity>
            }
          />
          <Route
            path="/hasil"
            element={
              <RequireAnswers>
                <PageTransition>
                  <Hasil />
                </PageTransition>
              </RequireAnswers>
            }
          />
          <Route
            path="/konsultasi"
            element={
              <RequireAnswers>
                <PageTransition>
                  <Konsultasi />
                </PageTransition>
              </RequireAnswers>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
