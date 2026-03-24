import { useState } from "react";
import { Link } from "react-router-dom";
import StackInput from "../components/StackInput";
import ResultsPanel from "../components/ResultsPanel";
import { checkStack } from "../logic/checkStack";
import supplements from "../data/supplements.json";

export default function Home() {
  const [stack, setStack] = useState([]);
  const results = checkStack(stack, supplements);

  return (
    <div className="home-layout">
      <aside className="ad-sidebar ad-sidebar-left">
        <div className="ad-slot ad-slot-vertical" data-ad-slot="home-left" />
      </aside>

      <main className="home">
        <div className="home-hero">
          <h1>Supplement Checker</h1>
          <p className="home-subtitle">Enter your supplements to check for interactions, timing, and gaps.</p>
          <StackInput stack={stack} setStack={setStack} />
        </div>

        <ResultsPanel results={results} />

        <footer className="disclaimer-footer">
          <p>
            This tool is for <strong>educational purposes only</strong> and does not
            constitute medical advice. Always consult a qualified healthcare provider
            before starting, stopping, or changing any supplement regimen.
          </p>
          <p><Link to="/terms">Terms of Use & Disclaimer</Link> | <Link to="/privacy">Privacy Policy</Link></p>
        </footer>
      </main>

      <aside className="ad-sidebar ad-sidebar-right">
        <div className="ad-slot ad-slot-vertical" data-ad-slot="home-right" />
      </aside>
    </div>
  );
}
