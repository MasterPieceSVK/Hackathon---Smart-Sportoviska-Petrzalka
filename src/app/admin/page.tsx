"use client"
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import { Bar, BarChart } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export default function Page(){
    const [date, setDate] = useState<Date | undefined>(new Date());

    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
    ];

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "#2563eb",
        },
        mobile: {
            label: "Mobile",
            color: "#60a5fa",
        },
    } satisfies ChartConfig

    return (
        <div>
        <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border max-w-64"
        />

        <ChartContainer config={chartConfig} className="max-w-64 max-h-64">
            <BarChart accessibilityLayer data={chartData}>
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
        </ChartContainer>
        </div>


    );
}

