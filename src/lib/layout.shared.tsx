import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { DocsNavbar } from "@/components/docs-navbar";
import { BlakeLogoIcon } from "@/components/blake-logo-icon";
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2">
          <BlakeLogoIcon className="w-12 h-12" />
          <span className="text-xl font-light flex leading-7">
            <span>Blake</span> <span className="font-medium">UI</span>
          </span>
          <span className="text-xs text-[#6A7383] border border-[#D7D7D0] rounded-sm px-1.5 py-0.5">
            v2.4
          </span>
        </span>
        // <span className="block -mb-6 items-center gap-0">
        // </span>
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
