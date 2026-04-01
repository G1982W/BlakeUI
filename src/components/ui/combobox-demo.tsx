"use client";

import * as React from "react";
import { GlobeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { InputGroupAddon } from "@/components/ui/input-group";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

export function ComboboxBasicDemo() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
(ComboboxBasicDemo as any).source =
  `<Combobox items={["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]}>
  <ComboboxInput placeholder="Select a framework" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;

export function ComboboxMultipleDemo() {
  return (
    <Combobox items={frameworks} multiple defaultValue={["Next.js", "Astro"]}>
      <ComboboxChips>
        <ComboboxValue>
          {(value) =>
            value.map((item: any) => (
              <ComboboxChip key={item}>{item}</ComboboxChip>
            ))
          }
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Add framework" />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
(ComboboxMultipleDemo as any).source = `<Combobox
  items={["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]}
  multiple
  defaultValue={["Next.js", "Astro"]}
>
  <ComboboxChips>
    <ComboboxValue>
      {(value) =>
        value.map((item) => <ComboboxChip key={item}>{item}</ComboboxChip>)
      }
    </ComboboxValue>
    <ComboboxChipsInput placeholder="Add framework" />
  </ComboboxChips>
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;

export function ComboboxClearDemo() {
  return (
    <Combobox items={frameworks} defaultValue="Next.js">
      <ComboboxInput placeholder="Select a framework" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
(ComboboxClearDemo as any).source = `<Combobox
  items={["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]}
  defaultValue="Next.js"
>
  <ComboboxInput placeholder="Select a framework" showClear />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;

type GroupedItem = { group: string; label: string };

const groupedItems: GroupedItem[] = [
  { group: "Frameworks", label: "Next.js" },
  { group: "Frameworks", label: "SvelteKit" },
  { group: "Libraries", label: "React" },
  { group: "Libraries", label: "Vue" },
];

export function ComboboxGroupsDemo() {
  return (
    <Combobox
      items={groupedItems}
      itemToStringValue={(item: any) => item.label}
    >
      <ComboboxInput placeholder="Select a library" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={`${item.group}-${item.label}`} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxGroup>
        <ComboboxSeparator />
      </ComboboxContent>
    </Combobox>
  );
}
(ComboboxGroupsDemo as any).source = `<Combobox
  items={[
    { group: "Frameworks", label: "Next.js" },
    { group: "Frameworks", label: "SvelteKit" },
    { group: "Libraries", label: "React" },
    { group: "Libraries", label: "Vue" },
  ]}
  itemToStringValue={(item) => item.label}
>
  <ComboboxInput placeholder="Select a library" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxGroup>
      <ComboboxList>
        {(item) => (
          <ComboboxItem key={\`\${item.group}-\${item.label}\`} value={item}>
            {item.label}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxGroup>
    <ComboboxSeparator />
  </ComboboxContent>
</Combobox>`;

type CustomItem = { label: string; value: string; category: string };

const customItems: CustomItem[] = [
  { label: "Next.js", value: "next", category: "Framework" },
  { label: "SvelteKit", value: "sveltekit", category: "Framework" },
  { label: "React", value: "react", category: "Library" },
];

export function ComboboxCustomItemsDemo() {
  return (
    <Combobox items={customItems} itemToStringValue={(item: any) => item.label}>
      <ComboboxInput placeholder="Select an item" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item}>
              <div className="flex w-full items-center justify-between">
                <span>{item.label}</span>
                <span className="text-xs text-muted-foreground">
                  {item.category}
                </span>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
(ComboboxCustomItemsDemo as any).source = `<Combobox
  items={[
    { label: "Next.js", value: "next", category: "Framework" },
    { label: "SvelteKit", value: "sveltekit", category: "Framework" },
    { label: "React", value: "react", category: "Library" },
  ]}
  itemToStringValue={(item) => item.label}
>
  <ComboboxInput placeholder="Select an item" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item.value} value={item}>
          <div className="flex w-full items-center justify-between">
            <span>{item.label}</span>
            <span className="text-xs text-muted-foreground">
              {item.category}
            </span>
          </div>
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;

export function ComboboxInvalidDemo() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" aria-invalid />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
(ComboboxInvalidDemo as any).source =
  `<Combobox items={["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]}>
  <ComboboxInput placeholder="Select a framework" aria-invalid />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;

export function ComboboxDisabledDemo() {
  return (
    <Combobox items={frameworks} disabled>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
(ComboboxDisabledDemo as any).source =
  `<Combobox items={["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]} disabled>
  <ComboboxInput placeholder="Select a framework" />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;

export function ComboboxAutoHighlightDemo() {
  return (
    <Combobox items={frameworks} autoHighlight>
      <ComboboxInput placeholder="Search frameworks..." />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
(ComboboxAutoHighlightDemo as any).source = `<Combobox
  items={["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]}
  autoHighlight
>
  <ComboboxInput placeholder="Search frameworks..." />
  <ComboboxContent>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;

const countries = ["Argentina", "Brazil", "Canada", "Japan", "Spain"];

export function ComboboxPopupDemo() {
  return (
    <Combobox items={countries}>
      <ComboboxTrigger
        render={
          <Button variant="primary" className="w-[220px] justify-between" />
        }
      >
        Select country
      </ComboboxTrigger>
      <ComboboxContent className="w-[220px]">
        <ComboboxInput placeholder="Search country..." showTrigger={false} />
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
(ComboboxPopupDemo as any).source =
  `<Combobox items={["Argentina", "Brazil", "Canada", "Japan", "Spain"]}>
  <ComboboxTrigger
    render={<Button variant="outline" className="w-[220px] justify-between" />}
  >
    Select country
  </ComboboxTrigger>
  <ComboboxContent className="w-[220px]">
    <ComboboxInput placeholder="Search country..." showTrigger={false} />
    <ComboboxEmpty>No countries found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;

const domains = ["example.com", "acme.dev", "blakeui.com"];

export function ComboboxInputGroupDemo() {
  return (
    <Combobox items={domains}>
      <ComboboxInput placeholder="Choose a domain">
        <InputGroupAddon align="inline-start">
          <GlobeIcon className="size-4 text-muted-foreground" />
        </InputGroupAddon>
      </ComboboxInput>
      <ComboboxContent>
        <ComboboxEmpty>No domains found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
(ComboboxInputGroupDemo as any).source =
  `<Combobox items={["example.com", "acme.dev", "blakeui.com"]}>
  <ComboboxInput placeholder="Choose a domain">
    <InputGroupAddon align="inline-start">
      <GlobeIcon className="size-4 text-muted-foreground" />
    </InputGroupAddon>
  </ComboboxInput>
  <ComboboxContent>
    <ComboboxEmpty>No domains found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;

const rtlCategories = ["التكنولوجيا", "الفئات", "الواجهات", "التصميم"];

export function ComboboxRtlDemo() {
  return (
    <div dir="rtl" className="w-[280px]">
      <Combobox items={rtlCategories}>
        <ComboboxInput placeholder="اختر فئة" />
        <ComboboxContent>
          <ComboboxEmpty>لا توجد نتائج.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
(ComboboxRtlDemo as any).source = `<div dir="rtl" className="w-[280px]">
  <Combobox items={["التكنولوجيا", "الفئات", "الواجهات", "التصميم"]}>
    <ComboboxInput placeholder="اختر فئة" />
    <ComboboxContent>
      <ComboboxEmpty>لا توجد نتائج.</ComboboxEmpty>
      <ComboboxList>
        {(item) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>`;
