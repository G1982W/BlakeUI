"use client"

import * as React from "react"
import propsMetadata from "../props.json"

interface PropDefinition {
    name: string
    type: string
    defaultValue?: string
    description?: string
    required?: boolean
}

interface PropsTableProps {
    component: string
}

export function PropsTable({ component }: PropsTableProps) {
    const props = (propsMetadata as Record<string, PropDefinition[]>)[component] || []

    if (props.length === 0) {
        return (
            <div className="my-6 rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
                No prop metadata found for component "{component}".
            </div>
        )
    }

    return (
        <div className="my-6 overflow-hidden rounded-lg border">
            <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 font-medium">
                    <tr>
                        <th className="px-4 py-2">Prop</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Default</th>
                        <th className="px-4 py-2">Description</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {props.map((prop) => (
                        <tr key={prop.name}>
                            <td className="px-4 py-2 font-mono text-xs font-semibold">
                                {prop.name}
                                {prop.required && <span className="ml-1 text-destructive">*</span>}
                            </td>
                            <td className="px-4 py-2 font-mono text-xs text-secondary-foreground max-w-[200px]" title={prop.type}>
                                {prop.type}
                            </td>
                            <td className="px-4 py-2 font-mono text-xs">{prop.defaultValue !== undefined ? String(prop.defaultValue) : "-"}</td>
                            <td className="px-4 py-2 text-muted-foreground">{prop.description || "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
