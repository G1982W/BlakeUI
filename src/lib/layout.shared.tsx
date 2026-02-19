import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { DocsNavbar } from "@/components/docs-navbar";
import { BlakeLogoIcon } from "@/components/blake-logo-icon";
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="block -mb-6 items-center gap-0">
          <BlakeLogoIcon className="w-14 h-14" />
          {/* <span>Blake UI</span> */}
        </span>
      ),
      url: "/docs",
      component: <DocsNavbar />,
    },
    links: [
      // { text: "Docs", url: "/docs", active: "nested-url" },
      // {
      //   text: "Components",
      //   url: "/docs",
      //   // active: "nested-url",
      //   active: "none",
      //   secondary: true,
      // },
      // {
      //   type: "icon",
      //   text: "Twitter",
      //   label: "Twitter",
      //   icon: <Twitter />,
      //   url: "https://x.com/blakeui",
      // },
    ],
    searchToggle: {
      enabled: false,
    },
    themeSwitch: {
      enabled: false,
    },
  };
}
