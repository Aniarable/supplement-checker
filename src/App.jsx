import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StackPairPage from "./pages/StackPairPage";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stack/:slug" element={<StackPairPage />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
}

export default App;
