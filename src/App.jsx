import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StackPairPage from "./pages/StackPairPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stack/:slug" element={<StackPairPage />} />
    </Routes>
  );
}

export default App;
