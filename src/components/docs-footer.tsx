"use client";

import * as React from "react";
import Link from "next/link";
import { BlakeLogoIcon } from "@/components/blake-logo-icon";
import TwitterIcon from "@/components/icons/twitter";
import { Github } from "lucide-react";
import {
  PrivacyPolicyDialogue,
  type PrivacyPolicyDialogueProps,
} from "@/components/privacy-policy-dialogue";

const productLinks = [
  { label: "Components", href: "#" },
  { label: "Templates", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "FAQ", href: "#" },
];

const resourceLinks = [
  { label: "Documentation", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Community", href: "#" },
  { label: "Help Center", href: "#" },
];

const legalLinks: {
  label: string;
  tab: PrivacyPolicyDialogueProps["defaultTab"];
}[] = [
  { label: "Privacy Policy", tab: "privacy" },
  { label: "Terms of Service", tab: "terms" },
  { label: "Cookie Policy", tab: "cookies" },
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DocsFooter() {
  const [dialogTab, setDialogTab] =
    React.useState<PrivacyPolicyDialogueProps["defaultTab"]>(undefined);

  return (
    <footer className="mt-16 w-full border-t border-border bg-background">
      <div className="mx-auto max-w-368 px-4 py-12 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center w-full justify-between gap-2 text-sm text-muted-foreground">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BlakeUI. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-2 items-center">
              {legalLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => setDialogTab(link.tab)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PrivacyPolicyDialogue
        open={dialogTab !== undefined}
        onOpenChange={(open) => !open && setDialogTab(undefined)}
        defaultTab={dialogTab}
      />
    </footer>
  );
}
