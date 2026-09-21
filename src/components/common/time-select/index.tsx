"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

function padTimeUnit(value: number) {
  return String(value).padStart(2, "0");
}

export type TimeSelectValue = {
  hours: number;
  minutes: number;
};

type TimeSelectProps = {
  value: TimeSelectValue;
  onChange: (value: TimeSelectValue) => void;
  className?: string;
  disabled?: boolean;
  idPrefix?: string;
};

export function TimeSelect({
  value,
  onChange,
  className,
  disabled,
  idPrefix = "time",
}: TimeSelectProps) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="group"
      aria-label="Expiry time"
    >
      <Select
        disabled={disabled}
        value={String(value.hours)}
        onValueChange={(next) => onChange({ ...value, hours: Number(next) })}
      >
        <SelectTrigger
          id={`${idPrefix}-hour`}
          className="w-[5.5rem]"
          aria-label="Hour"
        >
          <SelectValue placeholder="Hour" />
        </SelectTrigger>
        <SelectContent className="max-h-56">
          {HOURS.map((hour) => (
            <SelectItem key={hour} value={String(hour)}>
              {padTimeUnit(hour)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-muted-foreground text-sm font-medium" aria-hidden>
        :
      </span>
      <Select
        disabled={disabled}
        value={String(value.minutes)}
        onValueChange={(next) => onChange({ ...value, minutes: Number(next) })}
      >
        <SelectTrigger
          id={`${idPrefix}-minute`}
          className="w-[5.5rem]"
          aria-label="Minute"
        >
          <SelectValue placeholder="Min" />
        </SelectTrigger>
        <SelectContent className="max-h-56">
          {MINUTES.map((minute) => (
            <SelectItem key={minute} value={String(minute)}>
              {padTimeUnit(minute)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
