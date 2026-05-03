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

declare module "converters/App" {
  const ConvertersApp: ComponentType;
  export default ConvertersApp;
}

declare module "michaelmanzano/App" {
  import type { App } from "vue";
  type MountFunction = (el: HTMLElement) => App;
  type UnmountFunction = (app: App) => void;
}
