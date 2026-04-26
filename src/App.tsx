import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

const RemoteNavbar = lazy(() =>
  import("navbar/Navbar").then((m) => ({ default: m.default })),
);

// const RemoteConverters = lazy(() =>
//   import("converters/App").then((m) => ({ default: m.default })),
// );

function Home() {
  return (
    <main className="root-home">
      <h1>Welcome</h1>
      <p>Select an app from the navigation bar above.</p>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="root-loading">Loading nav…</div>}>
        <RemoteNavbar title="Zano" />
      </Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/converters/*"
          element={
            <Suspense fallback={<div className="root-loading">Loading…</div>}>
              {/* <RemoteConverters /> */}
              <h1>Converters app goes here</h1>
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
