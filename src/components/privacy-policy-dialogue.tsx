"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-semibold text-foreground">{children}</h2>;
}

function SectionBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 text-sm text-muted-foreground">
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5 ps-4">
      {items.map((item, i) => (
        <li key={i} className="list-disc">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <SectionHeading>{title}</SectionHeading>
      <SectionBody>{children}</SectionBody>
    </div>
  );
}

function PrivacyPolicyContent() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted-foreground">
        BlakeUI ("we," "our," or "us") operates blakeui.com, a library of
        enterprise-grade UI components. This Privacy Policy explains how we
        collect, use, and protect information when you visit our website or
        purchase our components.
      </p>

      <Section title="1. Information We Collect">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <p className="font-medium text-foreground">
              1.1 Information You Provide
            </p>
            <BulletList
              items={[
                "Name and email address when completing a purchase",
                "Billing information processed through our payment provider (Stripe)",
                "Any messages you send via our contact form or support email",
              ]}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-medium text-foreground">
              1.2 Automatically Collected Information
            </p>
            <BulletList
              items={[
                "IP address and general geographic region",
                "Browser type, device type, and operating system",
                "Pages visited, time on page, and referral source",
                "Cookie and tracking data (see Cookie Policy below)",
              ]}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-medium text-foreground">
              1.3 Payment Information
            </p>
            <p>
              All payment transactions are processed by Stripe. BlakeUI does not
              store credit card numbers or sensitive billing data on our
              servers. Stripe's privacy policy governs how your payment data is
              handled.
            </p>
          </div>
        </div>
      </Section>

      <Section title="2. How We Use Your Information">
        <BulletList
          items={[
            "To process your purchase and deliver component access",
            "To send order confirmations and license keys",
            "To provide customer support and respond to inquiries",
            "To improve our website and component library based on usage patterns",
            "To send product updates or announcements (you may opt out at any time)",
            "To comply with legal obligations",
          ]}
        />
      </Section>

      <Section title="3. Sharing Your Information">
        <p>
          We do not sell, rent, or trade your personal information. We may share
          data with:
        </p>
        <BulletList
          items={[
            "Stripe (payment processing)",
            "Analytics providers such as Google Analytics (aggregated, anonymized data)",
            "Hosting and infrastructure providers under confidentiality agreements",
            "Law enforcement or regulatory authorities if required by law",
          ]}
        />
      </Section>

      <Section title="4. Data Retention">
        <p>
          We retain your personal information for as long as necessary to
          fulfill the purposes described in this policy, satisfy legal
          requirements, or resolve disputes. You may request deletion of your
          data at any time by contacting us at legal@blakeui.com.
        </p>
      </Section>

      <Section title="5. Your Rights">
        <p>
          Depending on your location, you may have rights under applicable law,
          including:
        </p>
        <BulletList
          items={[
            "Access to the personal data we hold about you",
            "Correction of inaccurate or incomplete data",
            "Deletion of your personal data (subject to legal obligations)",
            "Objection to or restriction of certain data processing",
            "Data portability (where technically feasible)",
          ]}
        />
        <p>To exercise any of these rights, contact us at legal@blakeui.com.</p>
      </Section>

      <Section title="6. Security">
        <p>
          We use industry-standard security practices including HTTPS, encrypted
          data storage, and access controls to protect your information. No
          transmission method over the internet is 100% secure, and we cannot
          guarantee absolute security.
        </p>
      </Section>

      <Section title="7. Children's Privacy">
        <p>
          BlakeUI is not directed at children under the age of 13. We do not
          knowingly collect personal information from children. If you believe a
          child has provided us with personal data, please contact us
          immediately.
        </p>
      </Section>

      <Section title="8. Third-Party Links">
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices of those sites and encourage you
          to review their policies independently.
        </p>
      </Section>

      <Section title="9. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of material changes by posting the updated policy on this page
          with a revised effective date. Continued use of the site after changes
          constitutes your acceptance.
        </p>
      </Section>

      <Section title="10. Contact Us">
        <p>Questions about this Privacy Policy? Reach us at:</p>
        <BulletList
          items={["Email: legal@blakeui.com", "Website: blakeui.com"]}
        />
      </Section>
    </div>
  );
}

function TermsOfServiceContent() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted-foreground">
        These Terms of Service ("Terms") govern your access to and use of
        blakeui.com and the BlakeUI component library. By accessing the site or
        purchasing a license, you agree to be bound by these Terms. If you do
        not agree, do not use our products.
      </p>

      <Section title="1. Description of Services">
        <p>
          BlakeUI provides a library of production-ready, enterprise UI
          components designed for complex, data-heavy web applications.
          Components are available under two license tiers: a Free tier and a
          Startup tier (one-time purchase).
        </p>
      </Section>

      <Section title="2. License Grant">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <p className="font-medium text-foreground">2.1 Free Tier</p>
            <p>
              Access to 50+ components is provided at no charge under the
              BlakeUI Free License. You may use these components in personal and
              commercial projects, provided you comply with these Terms.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-medium text-foreground">
              2.2 Startup Tier ($99 One-Time Payment)
            </p>
            <p>
              Upon purchase, BlakeUI grants you a perpetual, non-exclusive,
              non-transferable license to:
            </p>
            <BulletList
              items={[
                "Access and use 100+ components in your own projects",
                "Receive lifetime updates to the component library",
                "Use components in an unlimited number of personal or commercial projects",
              ]}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-medium text-foreground">2.3 Restrictions</p>
            <p>Regardless of tier, you may not:</p>
            <BulletList
              items={[
                "Resell, sublicense, or redistribute BlakeUI components as a standalone product or competing library",
                "Remove copyright notices or attribution from the component source",
                "Claim ownership of the BlakeUI design system or its components",
                "Use BlakeUI to build a competing UI library or component marketplace",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section title="3. One-Time Payment & Refunds">
        <p>
          All Startup tier purchases are one-time payments. You will not be
          charged recurring fees. Lifetime updates are included for the duration
          of the BlakeUI product's existence.
        </p>
        <p>
          Refund requests may be considered within 7 days of purchase if you
          have not materially accessed or downloaded the component library.
          Contact us at legal@blakeui.com to request a refund.
        </p>
      </Section>

      <Section title="4. Intellectual Property">
        <p>
          BlakeUI and all associated code, designs, documentation, and visual
          assets are the intellectual property of BlakeUI and its creator. These
          Terms do not transfer ownership of any intellectual property to you.
          The license described in Section 2 is limited to the usage rights
          expressly stated.
        </p>
      </Section>

      <Section title="5. User Accounts">
        <p>
          Certain features may require account creation. You are responsible for
          maintaining the confidentiality of your login credentials and for all
          activity under your account. Notify us immediately of any unauthorized
          access.
        </p>
      </Section>

      <Section title="6. Acceptable Use">
        <p>You agree not to:</p>
        <BulletList
          items={[
            "Use BlakeUI for unlawful, harmful, or fraudulent purposes",
            "Attempt to reverse-engineer or extract proprietary design logic for competing products",
            "Interfere with the security or integrity of our website or infrastructure",
            "Use automated scraping tools to bulk-download component code",
          ]}
        />
      </Section>

      <Section title="7. Disclaimer of Warranties">
        <p>
          BlakeUI is provided "as is" and "as available" without warranties of
          any kind, express or implied. We do not warrant that the components
          will be error-free, uninterrupted, or suitable for every use case. You
          assume full responsibility for evaluating the appropriateness of
          BlakeUI for your project.
        </p>
      </Section>

      <Section title="8. Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, BlakeUI and its
          creator shall not be liable for any indirect, incidental,
          consequential, or punitive damages arising from your use of the
          component library or website, even if we have been advised of the
          possibility of such damages. Our total liability shall not exceed the
          amount you paid for your license.
        </p>
      </Section>

      <Section title="9. Indemnification">
        <p>
          You agree to indemnify and hold harmless BlakeUI, its creator, and
          affiliates from any claims, damages, or expenses (including legal
          fees) arising from your violation of these Terms or your use of the
          components in any unlawful or unauthorized manner.
        </p>
      </Section>

      <Section title="10. Modifications to Terms">
        <p>
          We reserve the right to update these Terms at any time. Continued use
          of the site or components after changes constitutes acceptance of the
          revised Terms. We will post changes with an updated effective date.
        </p>
      </Section>

      <Section title="11. Governing Law">
        <p>
          These Terms are governed by the laws of the State of Utah, United
          States, without regard to conflict of law principles. Any disputes
          shall be resolved in the courts of Salt Lake County, Utah.
        </p>
      </Section>

      <Section title="12. Termination">
        <p>
          We reserve the right to terminate or suspend your access to BlakeUI at
          our discretion if you violate these Terms. Provisions that by their
          nature should survive termination (including intellectual property,
          disclaimers, and limitations of liability) will survive.
        </p>
      </Section>

      <Section title="13. Contact">
        <p>For questions about these Terms, contact us at:</p>
        <BulletList
          items={["Email: legal@blakeui.com", "Website: blakeui.com"]}
        />
      </Section>
    </div>
  );
}

function CookiePolicyContent() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted-foreground">
        This Cookie Policy explains how BlakeUI uses cookies and similar
        tracking technologies on blakeui.com. By using the site, you consent to
        the use of cookies as described in this policy.
      </p>

      <Section title="1. What Are Cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They help websites remember your preferences, analyze
          traffic, and improve your experience. Cookies cannot run code or
          access files on your device.
        </p>
      </Section>

      <Section title="2. Types of Cookies We Use">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <p className="font-medium text-foreground">
              2.1 Strictly Necessary Cookies
            </p>
            <p>
              These cookies are required for the website to function and cannot
              be disabled. They include:
            </p>
            <BulletList
              items={[
                "Session management (keeping you logged into your account)",
                "Security tokens to prevent cross-site request forgery",
                "Shopping cart and checkout state during purchase",
              ]}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-medium text-foreground">2.2 Analytics Cookies</p>
            <p>
              We use Google Analytics to understand how visitors interact with
              our site. These cookies collect anonymized data including:
            </p>
            <BulletList
              items={[
                "Pages visited and navigation paths",
                "Time spent on each page",
                "General geographic region (country or city level)",
                "Referring websites and traffic sources",
              ]}
            />
            <p>
              Analytics cookies do not identify you personally. You can opt out
              of Google Analytics by visiting: tools.google.com/dlpage/gaoptout
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-medium text-foreground">
              2.3 Functional Cookies
            </p>
            <p>
              These cookies remember your preferences to improve your
              experience:
            </p>
            <BulletList
              items={[
                "Preferred theme (light/dark mode, if applicable)",
                "Previously viewed component categories",
                "Returning visitor recognition",
              ]}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-medium text-foreground">2.4 Payment Cookies</p>
            <p>
              When you make a purchase, Stripe (our payment processor) may set
              cookies necessary to process your transaction securely. These are
              governed by Stripe's own cookie and privacy policy.
            </p>
          </div>
        </div>
      </Section>

      <Section title="3. Third-Party Cookies">
        <p>Some cookies on our site are set by third parties we work with:</p>
        <BulletList
          items={[
            "Google Analytics (analytics.google.com)",
            "Stripe (stripe.com)",
          ]}
        />
        <p>
          We do not control how these third parties use cookies. Please refer to
          their privacy and cookie policies for more information.
        </p>
      </Section>

      <Section title="4. Cookie Duration">
        <p>Cookies on BlakeUI are either:</p>
        <BulletList
          items={[
            "Session cookies — deleted when you close your browser",
            "Persistent cookies — stored on your device for a set period (typically 30 days to 2 years depending on purpose)",
          ]}
        />
      </Section>

      <Section title="5. Managing Cookies">
        <p>
          You can control and delete cookies through your browser settings. Note
          that disabling certain cookies may affect site functionality.
          Browser-specific instructions:
        </p>
        <BulletList
          items={[
            "Chrome: Settings > Privacy and Security > Cookies",
            "Safari: Preferences > Privacy",
            "Firefox: Preferences > Privacy & Security",
            "Edge: Settings > Cookies and Site Permissions",
          ]}
        />
        <p>
          You can also opt out of interest-based advertising through the Digital
          Advertising Alliance at optout.aboutads.info or the Network
          Advertising Initiative at optout.networkadvertising.org.
        </p>
      </Section>

      <Section title="6. Do Not Track">
        <p>
          Some browsers offer a "Do Not Track" (DNT) signal. We currently do not
          alter our data collection practices in response to DNT signals, as
          there is no universally accepted standard for how sites should
          respond.
        </p>
      </Section>

      <Section title="7. Updates to This Policy">
        <p>
          We may update this Cookie Policy periodically. Changes will be posted
          to this page with a revised effective date. We encourage you to review
          this policy from time to time.
        </p>
      </Section>

      <Section title="8. Contact">
        <p>Questions about our use of cookies? Contact us at:</p>
        <BulletList
          items={["Email: legal@blakeui.com", "Website: blakeui.com"]}
        />
      </Section>
    </div>
  );
}

export type PrivacyPolicyDialogueProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultTab?: "privacy" | "terms" | "cookies";
};

function PrivacyPolicyDialogue({
  open,
  onOpenChange,
  defaultTab = "privacy",
}: PrivacyPolicyDialogueProps) {
  const [tab, setTab] = React.useState(defaultTab ?? "privacy");

  React.useEffect(() => {
    if (open && defaultTab) setTab(defaultTab);
  }, [open, defaultTab]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex flex-col gap-0 sm:max-w-2xl h-[85dvh] sm:h-[80dvh] p-0"
        data-slot="privacy-policy-dialogue"
      >
        <DialogHeader className="shrink-0 px-5 pt-5 pb-4 border-b border-border">
          <DialogTitle className="text-center text-base">
            Legal Policies
          </DialogTitle>
          <p className="text-xs text-center text-muted-foreground">
            BlakeUI — Effective Date: May 1, 2025
          </p>
        </DialogHeader>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as typeof tab)}
          className="flex flex-col flex-1 min-h-0 gap-0"
        >
          <div className="shrink-0 px-5 pt-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex sm:justify-center">
            <TabsList variant="line" className="gap-0">
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">
            <TabsContent value="privacy">
              <PrivacyPolicyContent />
            </TabsContent>
            <TabsContent value="terms">
              <TermsOfServiceContent />
            </TabsContent>
            <TabsContent value="cookies">
              <CookiePolicyContent />
            </TabsContent>
          </div>

          <div className="shrink-0 px-5 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              © 2026 BlakeUI. All rights reserved.
            </p>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export { PrivacyPolicyDialogue };
