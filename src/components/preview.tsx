"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { extractCode } from "@/lib/extract-code"

interface PreviewProps {
    children: React.ReactNode
    className?: string
}

export function Preview({ children, className }: PreviewProps) {
    const [copied, setCopied] = React.useState(false)
    const code = React.useMemo(() => extractCode(children), [children])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className={cn("group relative my-4 flex flex-col space-y-2", className)}>
            <div className="relative flex min-h-[200px] w-full items-center justify-center rounded-lg border bg-background p-10 ring-offset-background transition-colors">
                {children}
            </div>
            <div className="flex items-center justify-end px-4">
                <button
                    onClick={copyToClipboard}
                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    {copied ? "Copied!" : "Copy Code"}
                </button>
            </div>
        </div>
    )
}
