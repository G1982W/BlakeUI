"use client"

import * as React from "react"
import { Preview } from "./preview"
import { cn } from "@/lib/utils"
import { registry } from "./registry"

interface PlaygroundProps {
    component: string
    controls: {
        [key: string]: {
            type: "select" | "boolean" | "text"
            options?: string[]
        }
    }
}

export function Playground({ component: componentName, controls }: PlaygroundProps) {
    const Component = registry[componentName]

    const [state, setState] = React.useState<Record<string, any>>(() => {
        const initialState: Record<string, any> = {}
        Object.entries(controls).forEach(([key, control]) => {
            if (control.type === "boolean") initialState[key] = false
            else if (control.type === "select" && control.options) initialState[key] = control.options[0]
            else initialState[key] = ""
        })
        return initialState
    })

    if (!Component) {
        return <div>Component "{componentName}" not found in registry.</div>
    }

    return (
        <div className="flex flex-col space-y-4 rounded-lg border p-4">
            <Preview className="border-none bg-accent/50">
                <Component {...state}>Playground</Component>
            </Preview>
            <div className="grid grid-cols-1 gap-4 border-t pt-4 md:grid-cols-2">
                {Object.entries(controls).map(([key, control]) => (
                    <div key={key} className="flex flex-col space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {key}
                        </label>
                        {control.type === "select" ? (
                            <select
                                className="rounded-md border bg-background px-2 py-1 text-sm"
                                value={state[key]}
                                onChange={(e) => setState((s) => ({ ...s, [key]: e.target.value }))}
                            >
                                {control.options?.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        ) : control.type === "boolean" ? (
                            <input
                                type="checkbox"
                                checked={state[key]}
                                onChange={(e) => setState((s) => ({ ...s, [key]: e.target.checked }))}
                                className="size-4"
                            />
                        ) : (
                            <input
                                type="text"
                                value={state[key]}
                                onChange={(e) => setState((s) => ({ ...s, [key]: e.target.value }))}
                                className="rounded-md border bg-background px-2 py-1 text-sm"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
