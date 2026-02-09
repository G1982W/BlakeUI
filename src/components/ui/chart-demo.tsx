"use client"

import * as React from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
} from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
    { time: "00:00", value1: 2000, value2: 4000, value3: 3000, value4: 1000 },
    { time: "04:00", value1: 4500, value2: 3500, value3: 5000, value4: 2000 },
    { time: "08:00", value1: 3000, value2: 6000, value3: 4500, value4: 3500 },
    { time: "12:00", value1: 5500, value2: 4500, value3: 7000, value4: 5500 },
    { time: "16:00", value1: 8000, value2: 9000, value3: 6500, value4: 4000 },
    { time: "20:00", value1: 6500, value2: 7500, value3: 9000, value4: 8500 },
    { time: "23:59", value1: 9000, value2: 8500, value3: 8000, value4: 7000 },
]

const chartConfig = {
    value1: {
        label: "Series 1",
        color: "var(--primary)",
    },
    value2: {
        label: "Series 2",
        color: "var(--chart-2)",
    },
    value3: {
        label: "Series 3",
        color: "var(--chart-3)",
    },
    value4: {
        label: "Series 4",
        color: "var(--chart-4)",
    },
} satisfies ChartConfig

export function ChartGridDemo() {
    return (
        <div className="w-full bg-slate-100 p-8 rounded-2xl overflow-x-auto">
            <div className="min-w-[800px] bg-white rounded-xl border-2 border-dashed border-purple-200 p-12 shadow-sm">
                <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-x-8 gap-y-12 items-center">
                    {/* Headers */}
                    <div />
                    <div className="text-sm font-medium text-slate-500 flex flex-col items-center">
                        <span className="text-xs text-purple-600 font-bold self-start mb-2">❖ Charts</span>
                        Series: 1
                    </div>
                    <div className="text-sm font-medium text-slate-500 mt-6 text-center">Series: 2</div>
                    <div className="text-sm font-medium text-slate-500 mt-6 text-center">Series: 3</div>

                    {/* Line Charts Row */}
                    <div className="text-sm font-medium text-slate-500">Line Chart</div>

                    {/* Line Series 1 */}
                    <ChartContainer config={chartConfig} className="h-[200px]">
                        <LineChart data={data}>
                            <CartesianGrid vertical={false} stroke="#E2E8F0" />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: "#94A3B8", fontSize: 12 }}
                                ticks={[0, 12000]}
                                domain={[0, 12000]}
                                width={30}
                            />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    if (value === "00:00") return "Midnight"
                                    if (value === "23:59") return "11:59 pm"
                                    return ""
                                }}
                                tick={{ fill: "#94A3B8", fontSize: 12 }}
                                interval="preserveStartEnd"
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                                dataKey="value1"
                                type="monotone"
                                stroke="var(--color-value1)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>

                    {/* Line Series 2 */}
                    <ChartContainer config={chartConfig} className="h-[200px]">
                        <LineChart data={data}>
                            <CartesianGrid vertical={false} stroke="#E2E8F0" />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: "#94A3B8", fontSize: 12 }}
                                ticks={[0, 12000]}
                                domain={[0, 12000]}
                                width={30}
                            />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    if (value === "00:00") return "Midnight"
                                    if (value === "23:59") return "11:59 pm"
                                    return ""
                                }}
                                tick={{ fill: "#94A3B8", fontSize: 12 }}
                                interval="preserveStartEnd"
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                                dataKey="value1"
                                type="monotone"
                                stroke="#94A3B8"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                dataKey="value2"
                                type="monotone"
                                stroke="var(--color-value2)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>

                    {/* Line Series 3 */}
                    <ChartContainer config={chartConfig} className="h-[200px]">
                        <LineChart data={data}>
                            <CartesianGrid vertical={false} stroke="#E2E8F0" />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: "#94A3B8", fontSize: 12 }}
                                ticks={[0, 12000]}
                                domain={[0, 12000]}
                                width={30}
                            />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    if (value === "00:00") return "Midnight"
                                    if (value === "23:59") return "11:59 pm"
                                    return ""
                                }}
                                tick={{ fill: "#94A3B8", fontSize: 12 }}
                                interval="preserveStartEnd"
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                                dataKey="value1"
                                type="monotone"
                                stroke="#1E293B"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                dataKey="value2"
                                type="monotone"
                                stroke="var(--color-value2)"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                dataKey="value3"
                                type="monotone"
                                stroke="hsl(var(--chart-3))"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                dataKey="value4"
                                type="monotone"
                                stroke="hsl(var(--chart-4))"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>

                    {/* Bar Charts Row */}
                    <div className="text-sm font-medium text-slate-500">Bar Chart</div>

                    {/* Bar Series 1 */}
                    <ChartContainer config={chartConfig} className="h-[200px]">
                        <BarChart data={data}>
                            <CartesianGrid vertical={false} stroke="#E2E8F0" />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: "#94A3B8", fontSize: 12 }}
                                ticks={[0, 12000]}
                                domain={[0, 12000]}
                                width={30}
                            />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    if (value === "00:00") return "Midnight"
                                    if (value === "23:59") return "11:59 pm"
                                    return ""
                                }}
                                tick={{ fill: "#94A3B8", fontSize: 12 }}
                                interval="preserveStartEnd"
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                dataKey="value1"
                                fill="var(--color-value1)"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ChartContainer>

                    {/* Bar Series 2 */}
                    <ChartContainer config={chartConfig} className="h-[200px]">
                        <BarChart data={data}>
                            <CartesianGrid vertical={false} stroke="#E2E8F0" />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: "#94A3B8", fontSize: 12 }}
                                ticks={[0, 12000]}
                                domain={[0, 12000]}
                                width={30}
                            />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    if (value === "00:00") return "Midnight"
                                    if (value === "23:59") return "11:59 pm"
                                    return ""
                                }}
                                tick={{ fill: "#94A3B8", fontSize: 12 }}
                                interval="preserveStartEnd"
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                dataKey="value1"
                                fill="#1E293B"
                                radius={[2, 2, 0, 0]}
                                barSize={4}
                            />
                            <Bar
                                dataKey="value2"
                                fill="var(--color-value2)"
                                radius={[2, 2, 0, 0]}
                                barSize={4}
                            />
                        </BarChart>
                    </ChartContainer>

                    {/* Bar Series 3 */}
                    <ChartContainer config={chartConfig} className="h-[200px]">
                        <BarChart data={data}>
                            <CartesianGrid vertical={false} stroke="#E2E8F0" />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: "#94A3B8", fontSize: 12 }}
                                ticks={[0, 12000]}
                                domain={[0, 12000]}
                                width={30}
                            />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    if (value === "00:00") return "Midnight"
                                    if (value === "23:59") return "11:59 pm"
                                    return ""
                                }}
                                tick={{ fill: "#94A3B8", fontSize: 12 }}
                                interval="preserveStartEnd"
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                dataKey="value1"
                                fill="#1E293B"
                                stackId="a"
                                radius={[0, 0, 0, 0]}
                            />
                            <Bar
                                dataKey="value2"
                                fill="var(--color-value2)"
                                stackId="a"
                                radius={[0, 0, 0, 0]}
                            />
                            <Bar
                                dataKey="value3"
                                fill="hsl(var(--chart-3))"
                                stackId="a"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>
            </div>
        </div>
    )
}
