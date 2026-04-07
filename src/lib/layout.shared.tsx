import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { DocsNavbar } from "@/components/docs-navbar";
import { BlakeLogoIcon } from "@/components/blake-logo-icon";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-1.5">
          <BlakeLogoIcon />
          <span className="text-base font-medium text-foreground">
            blake<span className="font-bold">/ui</span>
          </span>
          <span className="rounded-sm border border-border px-1.5 py-0.5 text-xs text-muted-foreground">
            v1.0
          </span>
        </span>
      ),
      url: "/",
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
