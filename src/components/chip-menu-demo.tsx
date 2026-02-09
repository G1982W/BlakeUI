"use client"

import * as React from "react"
import { ChipMenu } from "@/components/ui/chip-menu"

const statusOptions = [
  { value: "new", label: "New" },
  { value: "active", label: "Active" },
  { value: "review", label: "In review" },
  { value: "done", label: "Done" },
]

export function ChipMenuDemo() {
  const [status, setStatus] = React.useState<string | null>(null)
  return (
    <ChipMenu
      value={status}
      onValueChange={setStatus}
      options={statusOptions}
      placeholder="Status"
      variant="default"
    />
  )
}

export function ChipMenuDemoVariants() {
  const [v1, setV1] = React.useState<string | null>(null)
  const [v2, setV2] = React.useState<string | null>("active")
  const [v3, setV3] = React.useState<string | null>(null)
  return (
    <div className="flex flex-wrap gap-2">
      <ChipMenu
        value={v1}
        onValueChange={setV1}
        options={statusOptions}
        placeholder="Default"
        variant="default"
      />
      <ChipMenu
        value={v2}
        onValueChange={setV2}
        options={statusOptions}
        placeholder="Secondary"
        variant="secondary"
      />
      <ChipMenu
        value={v3}
        onValueChange={setV3}
        options={statusOptions}
        placeholder="Outline"
        variant="outline"
      />
    </div>
  )
}
