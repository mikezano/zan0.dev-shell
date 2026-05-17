import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MichaelManzano from "./remotes/MichaelManzano";
import RemoteNavbar from "./remotes/Navbar";

const ZANO_PRESS_URL =
  import.meta.env.VITE_ZANO_PRESS_URL ?? "http://localhost:5000";

function ZanoPress() {
  return (
    <iframe
      src={ZANO_PRESS_URL}
      style={{ width: "100vw", height: "100vh", border: "none" }}
      title="zano-press"
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="root-loading">Loading nav…</div>}>
        <RemoteNavbar title="Zano" />
      </Suspense>
      <Routes>
        <Route path="/" element={<MichaelManzano />} />
        <Route path="/zano-press/*" element={<ZanoPress />} />
        <Route path="/me/*" element={<MichaelManzano />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
