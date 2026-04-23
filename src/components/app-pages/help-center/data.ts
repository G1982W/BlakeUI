export interface HelpCategory {
  id: string;
  label: string;
  description: string;
  icon: "book" | "credit" | "shield" | "puzzle" | "lifebuoy";
}

export interface HelpArticle {
  id: string;
  categoryId: string;
  title: string;
  excerpt: string;
  readTime: string;
  updatedLabel: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const helpCategories: HelpCategory[] = [
  {
    id: "getting-started",
    label: "Getting started",
    description: "Account setup, first project, imports",
    icon: "book",
  },
  {
    id: "billing",
    label: "Billing & plans",
    description: "Invoices, upgrades, payment methods",
    icon: "credit",
  },
  {
    id: "security",
    label: "Security & privacy",
    description: "SSO, compliance, data retention",
    icon: "shield",
  },
  {
    id: "integrations",
    label: "Integrations",
    description: "API keys, webhooks, third-party apps",
    icon: "puzzle",
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    description: "Errors, performance, known issues",
    icon: "lifebuoy",
  },
];

export const helpArticles: HelpArticle[] = [
  {
    id: "a1",
    categoryId: "getting-started",
    title: "Create your workspace in under five minutes",
    excerpt:
      "Walk through workspace naming, invites, and default roles so your team can ship on day one.",
    readTime: "4 min read",
    updatedLabel: "Updated 2 days ago",
  },
  {
    id: "a2",
    categoryId: "getting-started",
    title: "Import data from CSV or your previous tool",
    excerpt:
      "Map columns, validate rows, and run a dry import before committing changes to production.",
    readTime: "7 min read",
    updatedLabel: "Updated 1 week ago",
  },
  {
    id: "a3",
    categoryId: "billing",
    title: "Understand usage-based billing and soft limits",
    excerpt:
      "How we meter requests, when alerts fire, and how to set budgets per environment.",
    readTime: "6 min read",
    updatedLabel: "Updated 3 days ago",
  },
  {
    id: "a4",
    categoryId: "billing",
    title: "Download invoices and add a purchase order",
    excerpt:
      "Finance-friendly steps for PO numbers, tax IDs, and consolidated statements.",
    readTime: "3 min read",
    updatedLabel: "Updated 2 weeks ago",
  },
  {
    id: "a5",
    categoryId: "security",
    title: "Configure SAML SSO for your organization",
    excerpt:
      "IdP metadata, attribute mapping, session length, and recovery admin access.",
    readTime: "9 min read",
    updatedLabel: "Updated yesterday",
  },
  {
    id: "a6",
    categoryId: "integrations",
    title: "Rotate API keys without downtime",
    excerpt:
      "Staged rotation, overlapping validity windows, and auditing key usage.",
    readTime: "5 min read",
    updatedLabel: "Updated 4 days ago",
  },
  {
    id: "a7",
    categoryId: "troubleshooting",
    title: "Resolve 429 rate limit errors gracefully",
    excerpt:
      "Backoff headers, client retries, and when to request a limit increase.",
    readTime: "5 min read",
    updatedLabel: "Updated 5 days ago",
  },
];

export const helpFaqs: FaqItem[] = [
  {
    id: "f1",
    question: "Do you offer a free trial for teams?",
    answer:
      "Yes. New workspaces get a 14-day trial with full feature access. No credit card is required until you choose a paid plan.",
  },
  {
    id: "f2",
    question: "Where is my data hosted?",
    answer:
      "Production data is hosted in SOC 2–aligned regions. You can pick the primary region at workspace creation and request data residency add-ons on Enterprise.",
  },
  {
    id: "f3",
    question: "How do I export my data?",
    answer:
      "Admins can run self-serve exports from Settings → Data. Excludes include structured JSON, CSV for tabular resources, and audit logs.",
  },
  {
    id: "f4",
    question: "What support channels are included?",
    answer:
      "All plans include email support. Pro adds prioritized routing; Enterprise adds a shared Slack channel and named CSM coverage.",
  },
];
