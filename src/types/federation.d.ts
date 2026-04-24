declare module "navbar/Navbar" {
  import type { ComponentType } from "react";

  interface NavLinkDef {
    to: string;
    label: string;
    end?: boolean;
  }

  interface SiteNavbarProps {
    title?: string;
    logoSrc?: string;
    /** Override the default site links (/ /converters /qa-automation). */
    links?: NavLinkDef[];
  }

  const SiteNavbar: ComponentType<SiteNavbarProps>;
  export default SiteNavbar;
}

declare module "converters/Converters" {
  import type { ComponentType } from "react";

  const ConvertersApp: ComponentType;
  export default ConvertersApp;
}
