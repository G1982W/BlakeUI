"use client";

import { useMemo } from "react";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { helpCategories } from "./data";
import { filterHelpArticles, useHelpCenterStore } from "./store";

export function HelpArticlesPanel() {
  const searchQuery = useHelpCenterStore((s) => s.searchQuery);
  const categoryId = useHelpCenterStore((s) => s.categoryId);
  const articles = useMemo(
    () => filterHelpArticles(searchQuery, categoryId),
    [searchQuery, categoryId],
  );

  return (
    <section aria-labelledby="articles-heading">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2
            id="articles-heading"
            className="text-lg font-semibold tracking-tight text-foreground">
            Popular articles
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            {categoryId === "all"
              ? "Guides customers open most often."
              : `Articles in ${
                  helpCategories.find((c) => c.id === categoryId)?.label ??
                  "this category"
                }.`}
          </p>
        </div>
        {searchQuery ? (
          <Badge variant="secondary" className="font-normal">
            {articles.length} result{articles.length === 1 ? "" : "s"}
          </Badge>
        ) : null}
      </div>

      {articles.length === 0 ? (
        <Card className="border-dashed bg-muted/20">
          <CardHeader>
            <CardTitle className="text-base">No articles match</CardTitle>
            <CardDescription>
              Try a shorter search or pick a different category.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {articles.map((article) => {
            const cat = helpCategories.find((c) => c.id === article.categoryId);
            return (
              <li key={article.id}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader className="gap-2 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      {cat ? (
                        <Badge variant="outline" className="font-normal">
                          {cat.label}
                        </Badge>
                      ) : null}
                      <Sparkles className="text-muted-foreground size-4 shrink-0 opacity-60" />
                    </div>
                    <CardTitle className="text-base leading-snug">
                      <button
                        type="button"
                        className="group inline-flex w-full items-start gap-1 text-left hover:underline">
                        {article.title}
                        <ArrowUpRight className="text-muted-foreground size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 pt-0 text-xs">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {article.readTime}
                    </span>
                    <span>{article.updatedLabel}</span>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
