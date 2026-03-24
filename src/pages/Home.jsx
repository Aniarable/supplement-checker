import { useState } from "react";
import { Link } from "react-router-dom";
import StackInput from "../components/StackInput";
import ResultsPanel from "../components/ResultsPanel";
import { checkStack } from "../logic/checkStack";
import supplements from "../data/supplements.json";

const PRESET_STACKS = [
  { name: "Sleep Stack", supps: ["magnesium", "melatonin", "glycine", "l-theanine"] },
  { name: "Gym Stack", supps: ["creatine", "caffeine", "beta-alanine", "citrulline"] },
  { name: "Focus Stack", supps: ["alpha-gpc", "lions-mane", "caffeine", "l-theanine"] },
  { name: "Longevity Stack", supps: ["nac", "omega-3", "vitamin-d", "coq10"] },
  { name: "Stress Stack", supps: ["ashwagandha", "magnesium", "l-theanine", "rhodiola"] },
];

const FEATURED_PAIRS = [
  { slug: "vitamin-d-k2", a: "Vitamin D", b: "K2", blurb: "Essential synergy for calcium regulation and bone health" },
  { slug: "ashwagandha-magnesium", a: "Ashwagandha", b: "Magnesium", blurb: "The ultimate stress and sleep combo" },
  { slug: "creatine-caffeine", a: "Creatine", b: "Caffeine", blurb: "Do they compete or complement for performance?" },
  { slug: "omega-3-vitamin-d", a: "Omega-3", b: "Vitamin D", blurb: "Fat-soluble absorption boost" },
  { slug: "black-pepper-turmeric", a: "Black Pepper", b: "Turmeric", blurb: "Piperine increases curcumin absorption by 2000%" },
  { slug: "magnesium-zinc", a: "Magnesium", b: "Zinc", blurb: "Mineral competition -- should you space them apart?" },
];

export default function Home() {
  const [stack, setStack] = useState([]);
  const results = checkStack(stack, supplements);

  return (
    <div className="home-layout">
      <aside className="ad-sidebar ad-sidebar-left">
        <div className="ad-slot ad-slot-vertical" data-ad-slot="home-left" />
        <div className="sidebar-stacks">
          <h3 className="sidebar-stacks-title">Popular Stacks</h3>
          {PRESET_STACKS.map((preset) => (
            <button
              key={preset.name}
              className="sidebar-stack-btn"
              onClick={() => setStack(preset.supps)}
            >
              <span className="sidebar-stack-name">{preset.name}</span>
              <span className="sidebar-stack-count">{preset.supps.length} supps</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="home">
        <div className="home-hero">
          <h1>Supplement Checker</h1>
          <p className="home-subtitle">Enter your supplements to check for interactions, timing, and gaps.</p>
          <StackInput stack={stack} setStack={setStack} />
        </div>

        <ResultsPanel results={results} />

        <section className="featured-pairs">
          <h2>Popular Supplement Pairs</h2>
          <div className="featured-pairs-grid">
            {FEATURED_PAIRS.map((pair) => (
              <Link key={pair.slug} to={"/stack/" + pair.slug} className="featured-pair-card">
                <span className="featured-pair-names">{pair.a} + {pair.b}</span>
                <span className="featured-pair-blurb">{pair.blurb}</span>
              </Link>
            ))}
          </div>
        </section>

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
