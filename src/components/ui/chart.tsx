"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType<{ className?: string }>
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer")
  }
  return context
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) return undefined
  const payloadPayload =
    "payload" in payload &&
    typeof (payload as { payload?: unknown }).payload === "object" &&
    (payload as { payload?: unknown }).payload !== null
    ? (payload as { payload: Record<string, unknown> }).payload
    : undefined

  let configLabelKey: string = key
  const pl = payload as Record<string, unknown>
  if (key in pl && typeof pl[key] === "string") {
    configLabelKey = pl[key] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === "string"
  ) {
    configLabelKey = payloadPayload[key] as string
  }
  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ReactElement
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn("w-full", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(
    ([, c]) => c.theme != null || c.color != null
  )
  if (!colorConfig.length) return null

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const selector = prefix ? `${prefix} [data-chart=${id}]` : `[data-chart=${id}]`
      const vars = colorConfig
        .map(([key, itemConfig]) => {
          const color =
            itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
            itemConfig.color
          return color ? `  --color-${key}: ${color};` : null
        })
        .filter(Boolean)
        .join("\n")
      return `${selector} {\n${vars}\n}`
    })
    .join("\n\n")

  return <style dangerouslySetInnerHTML={{ __html: css }} />
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) return null
      const [item] = payload
      const key = `${labelKey ?? (item?.dataKey ?? item?.name) ?? "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        labelKey == null && typeof label === "string"
          ? config[label as keyof typeof config]?.label ?? label
          : itemConfig?.label
      if (labelFormatter != null) {
        return <>{labelFormatter(value, payload)}</>
      }
      if (value == null) return null
      return <span className={labelClassName}>{value}</span>
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey])

    if (!active || !payload?.length) return null

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-popover px-2.5 py-1.5 text-sm text-popover-foreground shadow-md",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        {payload.map((item, index) => {
          const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor =
            color ?? (item.payload as { fill?: string })?.fill ?? item.color

          return (
            <div key={item.dataKey ?? index} className="flex items-center gap-2">
              {formatter != null && item?.value !== undefined && item.name != null ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon != null ? (
                    <itemConfig.icon className="size-4 shrink-0" />
                  ) : (
                    !hideIndicator && (
                      <span
                        className={cn(
                          "rounded-full shrink-0",
                          indicator === "dot" && "size-2.5",
                          indicator === "line" && "h-0.5 w-4",
                          indicator === "dashed" && "h-0.5 w-4 border-t-2 border-dashed"
                        )}
                        style={{
                          backgroundColor:
                            indicator === "dot" ? indicatorColor : undefined,
                          borderColor: indicator === "dashed" ? indicatorColor : undefined,
                        }}
                      />
                    )
                  )}
                  {nestLabel ? tooltipLabel : null}
                  <span>{itemConfig?.label ?? item.name}</span>
                  {item.value != null && (
                    <span className="font-medium tabular-nums">
                      {item.value.toLocaleString()}
                    </span>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Legend> &
    React.ComponentProps<"div"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(({ className, hideIcon = false, payload, nameKey }, ref) => {
  const { config } = useChart()
  if (!payload?.length) return null

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap justify-center gap-4 gap-y-2 [&_svg]:size-3.5",
        className
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey ?? item.dataKey ?? "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)
        return (
          <div key={item.value} className="flex items-center gap-1.5">
            {itemConfig?.icon != null && !hideIcon ? (
              <itemConfig.icon className="size-4 shrink-0" />
            ) : (
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: item.color ?? (item.payload as { fill?: string })?.fill,
                }}
              />
            )}
            <span className="text-muted-foreground text-xs">
              {itemConfig?.label ?? item.value}
            </span>
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
