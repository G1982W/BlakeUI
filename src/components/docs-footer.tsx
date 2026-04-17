import Link from "next/link";
import { BlakeLogoIcon } from "@/components/blake-logo-icon";
import TwitterIcon from "@/components/icons/twitter";
import { Github } from "lucide-react";

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

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
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
  return (
    <footer className="mt-16 w-full border-t border-border bg-background">
      <div className="mx-auto max-w-368 px-4 py-12 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center w-full justify-between gap-2 text-sm text-muted-foreground">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BlakeUI. All rights reserved.
            </div>
            <div className="flex justify-center gap-2 items-center">
              {/* <LinkColumn title="Legal" links={legalLinks} /> */}
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* <span
              className="inline-block size-2 shrink-0 rounded-full bg-emerald-500"
              aria-hidden
            />
            All systems operational */}
          </div>
        </div>
      </div>
    </footer>
  );
}
