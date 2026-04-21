/**
 * Recharts types are declared on the package root, but some tooling only resolves
 * value exports from `"recharts"`. Import chart-related types from this module instead.
 */
export type {
  DefaultLegendContentProps,
  LegendPayload,
} from "recharts/types/component/DefaultLegendContent"
export type { TooltipContentProps } from "recharts/types/component/Tooltip"
export type { Payload as TooltipPayloadEntry } from "recharts/types/component/DefaultTooltipContent"
