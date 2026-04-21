import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { DocsSidebarUserProfileWithSupabase } from "@/components/docs-sidebar-user-profile";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      sidebar={{
        defaultOpenLevel: 2,
        collapsible: false,
        footer: <DocsSidebarUserProfileWithSupabase />,
      }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
