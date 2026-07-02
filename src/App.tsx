import type { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Asesmen from "./pages/Asesmen";
import Kuesioner from "./pages/Kuesioner";
import Hasil from "./pages/Hasil";
import Konsultasi from "./pages/Konsultasi";
import { useAssessment } from "./lib/AssessmentContext";
import { isAnswersComplete, isIdentityComplete } from "./lib/assessment";

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
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/asesmen" element={<Asesmen />} />
      <Route
        path="/asesmen/kuesioner"
        element={
          <RequireIdentity>
            <Kuesioner />
          </RequireIdentity>
        }
      />
      <Route
        path="/hasil"
        element={
          <RequireAnswers>
            <Hasil />
          </RequireAnswers>
        }
      />
      <Route
        path="/konsultasi"
        element={
          <RequireAnswers>
            <Konsultasi />
          </RequireAnswers>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
