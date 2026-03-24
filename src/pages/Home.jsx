import { useState } from "react";
import StackInput from "../components/StackInput";
import ResultsPanel from "../components/ResultsPanel";
import { checkStack } from "../logic/checkStack";
import supplements from "../data/supplements.json";

export default function Home() {
  const [stack, setStack] = useState([]);
  const results = checkStack(stack, supplements);

  return (
    <main className="home">
      <h1>Supplement Checker</h1>
      <p>Enter your supplements to check for interactions, timing, and gaps.</p>

      <StackInput stack={stack} setStack={setStack} />

      {/* AdSense placeholder */}
      <div className="ad-slot" data-ad-slot="home-mid" />

      <ResultsPanel results={results} />

      {/* AdSense placeholder */}
      <div className="ad-slot" data-ad-slot="home-bottom" />
    </main>
  );
}
