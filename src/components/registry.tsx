"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FormDemo } from "@/components/ui/form-demo"
import { ChartGridDemo } from "@/components/ui/chart-demo"

export const registry: Record<string, React.ComponentType<any>> = {
    Button,
    Badge,
    Input,
    FormDemo,
    ChartGridDemo,
}
