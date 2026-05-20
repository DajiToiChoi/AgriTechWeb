import { ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: ReactNode;
  min: number;
  max: number;
}

export function SensorCard({ title, value, unit, icon, min, max }: SensorCardProps) {
  let status: "safe" | "warning" | "critical" = "safe";
  const range = max - min;
  const warningMargin = range * 0.15;

  if (value < min - warningMargin || value > max + warningMargin) {
    status = "critical";
  } else if (value < min || value > max) {
    status = "warning";
  }

  return (
    <div
      className={cn(
        "rounded-3xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg",
        status === "critical" && "border-destructive/50 bg-destructive/5",
        status === "warning" && "border-amber-400/70 bg-amber-50",
      )}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
            {icon}
          </div>
          <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
        </div>
        {status === "safe" ? (
          <CheckCircle2 className="h-5 w-5 text-primary" />
        ) : (
          <AlertCircle className={cn("h-5 w-5", status === "warning" ? "text-amber-500" : "text-destructive")} />
        )}
      </div>

      <div className="flex items-end gap-1">
        <span
          className={cn(
            "text-3xl font-extrabold tracking-tight",
            status === "critical" && "text-destructive",
            status === "warning" && "text-amber-600",
          )}
        >
          {value.toFixed(1)}
        </span>
        <span className="pb-1 text-sm font-semibold text-muted-foreground">{unit}</span>
      </div>

      <div className="mt-5 flex justify-between border-t pt-4 text-xs text-muted-foreground">
        <span>Ngưỡng chuẩn</span>
        <span className="font-semibold">
          {min} - {max} {unit}
        </span>
      </div>
    </div>
  );
}
