"use client";

import { LifeBuoy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { HelpSearch } from "./help-search";
import { HelpCategoriesSidebar } from "./help-categories-sidebar";
import { HelpArticlesPanel } from "./help-articles-panel";
import { HelpFaq } from "./help-faq";
import { HelpSupport } from "./help-support";

export function HelpCenterLayout() {
  return (
    <div className="bg-background text-foreground flex min-h-0 w-full flex-col">
      <header className="border-border bg-muted/20 border-b">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl border border-primary/15">
              <LifeBuoy className="size-5" />
            </span>
            <div>
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Help center
              </p>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                How can we help?
              </h1>
            </div>
          </div>
          <HelpSearch />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:gap-10 lg:px-8 lg:py-10">
        <aside className="lg:w-56 lg:shrink-0">
          <HelpCategoriesSidebar />
        </aside>

        <Separator className="lg:hidden" />

        <main className="min-w-0 flex-1 pb-12">
          <HelpArticlesPanel />
          <HelpFaq />
          <HelpSupport />
        </main>
      </div>
    </div>
  );
}
