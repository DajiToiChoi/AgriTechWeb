"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { MOCK_CHART_DATA } from "@/lib/mockData";

interface RealtimeChartProps {
  dataKey: string;
  color?: string;
}

export function RealtimeChart({ dataKey, color = "hsl(var(--primary))" }: RealtimeChartProps) {
  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={MOCK_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--card))", 
              borderColor: "hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--card-foreground))"
            }}
            itemStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: color, stroke: "hsl(var(--background))", strokeWidth: 2 }}
            isAnimationActive={false} // Disable animation to prevent hydration issues
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
