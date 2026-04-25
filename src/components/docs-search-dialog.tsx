"use client";

import type { ComponentProps } from "react";
import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { I18nLabel, useI18n } from "fumadocs-ui/contexts/i18n";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
} from "fumadocs-ui/components/dialog/search";
import DefaultSearchDialog from "fumadocs-ui/components/dialog/search-default";
import { useDocsSearch } from "fumadocs-core/search/client";
import { useOnChange } from "fumadocs-core/utils/use-on-change";

type DocsSearchDialogProps = ComponentProps<typeof DefaultSearchDialog>;

export function DocsSearchDialog({
  defaultTag,
  tags = [],
  api,
  delayMs,
  type = "fetch",
  allowClear = false,
  links = [],
  footer,
  ...props
}: DocsSearchDialogProps) {
  const { locale } = useI18n();
  const [tag, setTag] = useState(defaultTag);

  const { search, setSearch, query } = useDocsSearch(
    type === "fetch"
      ? { type: "fetch", api, locale, tag, delayMs }
      : { type: "static", from: api, locale, tag, delayMs },
  );

  const defaultItems = useMemo(() => {
    if (links.length === 0) return null;
    return links.map(([name, link]) => ({
      type: "page" as const,
      id: name,
      content: name,
      url: link,
    }));
  }, [links]);

  useOnChange(defaultTag, (value) => {
    setTag(value);
  });

  const resolvedItems = query.data !== "empty" ? query.data : defaultItems;
  const showLoading = query.isLoading && resolvedItems == null;

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>

        <SearchDialogList
          items={showLoading ? [] : resolvedItems}
          Empty={() =>
            showLoading ? (
              <div className="flex items-center justify-center gap-2 py-12 text-sm text-fd-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                <span>Searching...</span>
              </div>
            ) : (
              <div className="py-12 text-center text-sm text-fd-muted-foreground">
                <I18nLabel label="searchNoResult" />
              </div>
            )
          }
        />
      </SearchDialogContent>

      <SearchDialogFooter>
        {tags.length > 0 && (
          <TagsList tag={tag} onTagChange={setTag} allowClear={allowClear}>
            {tags.map((tagItem) => (
              <TagsListItem key={tagItem.value} value={tagItem.value}>
                {tagItem.name}
              </TagsListItem>
            ))}
          </TagsList>
        )}
        {footer}
      </SearchDialogFooter>
    </SearchDialog>
  );
}
