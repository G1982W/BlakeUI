"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { helpFaqs } from "./data";

export function HelpFaq() {
  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-lg font-semibold tracking-tight text-foreground">
        Frequently asked questions
      </h2>
      <p className="text-muted-foreground mt-1 mb-6 text-sm">
        Quick answers for the most common questions. Still stuck? Reach out
        below.
      </p>
      <Accordion type="single" collapsible className="w-full rounded-xl border px-4">
        {helpFaqs.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border-border">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
