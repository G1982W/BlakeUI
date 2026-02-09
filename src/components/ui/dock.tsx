"use client"

import * as React from "react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const DOCK_POSITIONS = ["top", "bottom", "left", "right"] as const
export type DockPosition = (typeof DOCK_POSITIONS)[number]

const DockContext = React.createContext<{
  position: DockPosition
  hoveredIndex: number | null
  setHoveredIndex: (index: number | null) => void
  magnification: number
  itemCount: number
} | null>(null)

function useDock() {
  const ctx = React.useContext(DockContext)
  if (!ctx) throw new Error("DockItem must be used within Dock")
  return ctx
}

/** Base scale when no item is hovered; hovered item reaches magnification. */
const MAGNIFICATION_DEFAULT = 1.4
/** How much adjacent items scale (falloff). */
const MAGNIFICATION_ADJACENT = 0.15

function getScale(
  index: number,
  hoveredIndex: number | null,
  magnification: number
): number {
  if (hoveredIndex === null) return 1
  const distance = Math.abs(index - hoveredIndex)
  if (distance === 0) return magnification
  const falloff = Math.max(0, magnification - 1 - distance * MAGNIFICATION_ADJACENT)
  return 1 + falloff
}

export interface DockProps extends React.ComponentProps<"div"> {
  /** Where the dock is anchored. */
  position?: DockPosition
  /** When true, dock hides off-screen and shows on edge hover. */
  autoHide?: boolean
  /** Scale of the hovered icon (macOS-like zoom). Default 1.4. */
  magnification?: number
  /** Delay in ms before hiding when pointer leaves. Default 300. */
  hideDelay?: number
  /** Thickness of the edge trigger zone in px for auto-hide. Default 24. */
  triggerSize?: number
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      position = "bottom",
      autoHide = false,
      magnification = MAGNIFICATION_DEFAULT,
      hideDelay = 300,
      triggerSize = 24,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
    const [visible, setVisible] = React.useState(!autoHide)
    const hideTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const items = React.Children.toArray(children).filter(
      (c): c is React.ReactElement => React.isValidElement(c) && (c.type as { displayName?: string })?.displayName === "DockItem"
    )
    const itemCount = items.length

    // When autoHide is turned off, show dock; when turned on, hide it
    React.useEffect(() => {
      if (!autoHide) setVisible(true)
      else setVisible(false)
    }, [autoHide])

    const showDock = React.useCallback(() => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
        hideTimeoutRef.current = null
      }
      setVisible(true)
    }, [])

    const scheduleHide = React.useCallback(() => {
      if (!autoHide) return
      hideTimeoutRef.current = setTimeout(() => setVisible(false), hideDelay)
    }, [autoHide, hideDelay])

    const handleTriggerEnter = () => showDock()
    const handleTriggerLeave = () => scheduleHide()
    const handleDockEnter = () => showDock()
    const handleDockLeave = () => scheduleHide()

    React.useEffect(() => () => { hideTimeoutRef.current && clearTimeout(hideTimeoutRef.current) }, [])

    const isHorizontal = position === "top" || position === "bottom"

    // Translate the dock fully off-screen when hidden (include buffer so no sliver is visible)
    const hideOffsetPx = triggerSize + 4
    const dockTranslate = (() => {
      if (!autoHide || visible) return "translate(0,0)"
      const offset = `calc(100% + ${hideOffsetPx}px)`
      const negOffset = `calc(-100% - ${hideOffsetPx}px)`
      switch (position) {
        case "top":
          return `translateY(${negOffset})`
        case "bottom":
          return `translateY(${offset})`
        case "left":
          return `translateX(${negOffset})`
        case "right":
          return `translateX(${offset})`
      }
    })()

    // When autoHide: container has zero size (doesn't block clicks). Trigger and dock use position:fixed so they're viewport-relative and work on all edges.
    const containerPositionClasses = {
      top: "inset-x-0 top-0",
      bottom: "inset-x-0 bottom-0",
      left: "inset-y-0 left-0",
      right: "inset-y-0 right-0",
    }
    const dockPositionClasses = {
      top: "flex-row justify-center pt-2",
      bottom: "flex-row justify-center pb-2",
      left: "flex-col items-center pl-2",
      right: "flex-col items-center pr-2",
    }

    const triggerPosition: React.CSSProperties = (() => {
      switch (position) {
        case "top":
          return { top: 0, left: 0, right: 0, height: triggerSize }
        case "bottom":
          return { bottom: 0, left: 0, right: 0, height: triggerSize }
        case "left":
          return { left: 0, top: 0, bottom: 0, width: triggerSize }
        case "right":
          return { right: 0, top: 0, bottom: 0, width: triggerSize }
      }
    })()

    const dockBarPosition: React.CSSProperties = (() => {
      switch (position) {
        case "top":
          return { top: 0, left: 0, right: 0 }
        case "bottom":
          return { bottom: 0, left: 0, right: 0 }
        case "left":
          return { left: 0, top: 0, bottom: 0 }
        case "right":
          return { right: 0, top: 0, bottom: 0 }
      }
    })()

    // Trigger: when autoHide use fixed so it's viewport-relative (works for top/left). Otherwise absolute inside container.
    const triggerStyle: React.CSSProperties = {
      position: autoHide ? "fixed" : "absolute",
      zIndex: 10,
      ...triggerPosition,
    }

    // Dock bar: when autoHide use fixed so viewport-relative. Hidden dock gets pointer-events-none.
    const dockBarStyle: React.CSSProperties = {
      position: autoHide ? "fixed" : "absolute",
      ...dockBarPosition,
      transform: dockTranslate,
      transition: "transform 0.2s ease-out",
      pointerEvents: autoHide && !visible ? ("none" as const) : ("auto" as const),
      zIndex: 5,
    }

    // When autoHide, omit padding on the edge side so the bar sits flush with the trigger (no gap).
    const dockBarClassName = cn(
      "absolute flex items-center gap-1 rounded-2xl border bg-background/80 px-4 py-1.5 shadow-lg backdrop-blur-md",
      isHorizontal ? "flex-row justify-center" : "flex-col items-center",
      position === "top" && (autoHide ? "pt-2" : "pt-4"),
      position === "bottom" && (autoHide ? "pb-0" : "pb-2"),
      position === "left" && (autoHide ? "pl-0" : "pl-2"),
      position === "right" && (autoHide ? "pr-2" : "pr-4")
    )

    return (
      <DockContext.Provider
        value={{
          position,
          hoveredIndex,
          setHoveredIndex,
          magnification,
          itemCount,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "fixed z-50",
            autoHide ? "left-0 top-0 h-0 w-0 overflow-visible" : containerPositionClasses[position],
            className
          )}
          data-slot="dock"
          data-position={position}
          {...props}
        >
          {autoHide && (
            <div
              aria-hidden
              className="pointer-events-auto"
              style={triggerStyle}
              onMouseEnter={handleTriggerEnter}
              onMouseLeave={handleTriggerLeave}
            />
          )}
          <div
            className={dockBarClassName}
            style={dockBarStyle}
            onMouseEnter={handleDockEnter}
            onMouseLeave={handleDockLeave}
          >
            {React.Children.map(children, (child, index) => {
              if (!React.isValidElement(child)) return child
              const item = child as React.ReactElement<{ index?: number }>
              if ((item.type as { displayName?: string })?.displayName !== "DockItem") {
                return child
              }
              return React.cloneElement(item, { index })
            })}
          </div>
        </div>
      </DockContext.Provider>
    )
  }
)
Dock.displayName = "Dock"

export interface DockItemProps
  extends Omit<React.ComponentProps<"button">, "children"> {
  /** Icon element (e.g. Lucide icon). */
  icon: React.ReactNode
  /** Shown in tooltip on hover. */
  label: React.ReactNode
  /** If set, renders as a link. */
  href?: string
  /** Optional badge (e.g. notification dot). */
  badge?: React.ReactNode
  /** Internal: set by Dock. */
  index?: number
  children?: never
}

const DockItem = React.forwardRef<HTMLButtonElement, DockItemProps>(
  (
    { icon, label, href, badge, index = 0, className, onMouseEnter, onMouseLeave, ...props },
    ref
  ) => {
    const { position, hoveredIndex, setHoveredIndex, magnification, itemCount } =
      useDock()

    const scale = getScale(index, hoveredIndex, magnification)
    const isHorizontal = position === "top" || position === "bottom"

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      setHoveredIndex(index ?? null)
      onMouseEnter?.(e as any)
    }
    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      setHoveredIndex(null)
      onMouseLeave?.(e as any)
    }

    const content = (
      <span
        className="relative flex items-center justify-center transition-transform duration-150 ease-out"
        style={{ transform: `scale(${scale})` }}
      >
        <span className="flex size-10 items-center justify-center rounded-lg [&>svg]:size-6">
          {icon}
        </span>
        {badge != null && (
          <span className="absolute -right-0.5 -top-0.5 flex size-2.5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            {badge}
          </span>
        )}
      </span>
    )

    const trigger = href ? (
      <a
        href={href}
        className={cn(
          "flex cursor-pointer items-center justify-center rounded-lg text-foreground outline-none transition-colors hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {content}
      </a>
    ) : (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex cursor-pointer items-center justify-center rounded-lg text-foreground outline-none transition-colors hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {content}
      </button>
    )

    return (
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent
          side={
            position === "top"
              ? "bottom"
              : position === "bottom"
                ? "top"
                : position === "left"
                  ? "right"
                  : "left"
          }
          sideOffset={8}
        >
          {label}
        </TooltipContent>
      </Tooltip>
    )
  }
)
DockItem.displayName = "DockItem"

export { Dock, DockItem }
