import { lazy } from "react";

const RemoteNavbar = lazy(() =>
  import("navbar/Navbar")
    .then((m) => ({ default: m.default }))
    .catch(() => ({
      default: () => (
        <nav style={{ padding: "1rem" }}>Navigation unavailable</nav>
      ),
    })),
);

export default RemoteNavbar;
