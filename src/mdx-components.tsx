import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentPreview } from "@/components/component-preview";
import { PremiumOnly } from "@/components/premium-only";
import { ComponentsGrid } from "@/components/components-grid";
import { ToastDemo, ToastDemoButton } from "@/components/toast-demo";
import { BannerDemoButtons, BannerDemoInline } from "@/components/banner-demo";
import { ChipMenuDemo, ChipMenuDemoVariants } from "@/components/chip-menu-demo";
import {
  BarChartDemo,
  BarChartSingleSeriesDemo,
  BarChartStackedDemo,
} from "@/components/bar-chart-demo";
import {
  LineChartDemo,
  LineChartSingleSeriesDemo,
  LineChartMultiSeriesDemo,
} from "@/components/line-chart-demo";
import { DockDemo } from "@/components/dock-demo";
import { DrawerDemo } from "@/components/drawer-demo";
import { FormDemo } from "@/components/ui/form-demo";
import { ChartGridDemo } from "@/components/ui/chart-demo";
import { ListViewDemo } from "@/components/list-view-demo";
import { ButtonVariantShowcase } from "@/components/button-variant-showcase";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    p: (props) => <span {...props} />,
    ComponentPreview,
    PremiumOnly,
    ComponentsGrid,
    ToastDemo,
    ToastDemoButton,
    BannerDemoButtons,
    BannerDemoInline,
    ChipMenuDemo,
    ChipMenuDemoVariants,
    BarChartDemo,
    BarChartSingleSeriesDemo,
    BarChartStackedDemo,
    LineChartDemo,
    LineChartSingleSeriesDemo,
    LineChartMultiSeriesDemo,
    DockDemo,
    DrawerDemo,
    FormDemo,
    ChartGridDemo,
    ListViewDemo,
    ButtonVariantShowcase,
  } as MDXComponents;
}
