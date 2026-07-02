import { Link } from "react-router-dom";
import iconMark from "../assets/icon-mark.png";

export default function Header() {
  return (
    <header className="w-full py-4 px-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={iconMark} alt="" className="h-9 w-9 object-contain" />
          <span className="font-display text-xl font-extrabold tracking-tight">
            <span style={{ color: "var(--color-green-900)" }}>Study</span>
            <span style={{ color: "var(--color-gold-600)" }}>Sync</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
