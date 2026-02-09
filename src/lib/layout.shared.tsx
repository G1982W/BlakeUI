import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { DocsNavbar } from "@/components/docs-navbar";
import { Twitter } from "lucide-react";
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "Blake UI",
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
  };
}
