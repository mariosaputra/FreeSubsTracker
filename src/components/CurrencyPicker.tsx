"use client";

import { CURRENCIES } from "@/lib/formatCurrency";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CurrencyPickerProps {
  value: string;
  onChange: (code: string) => void;
}

export default function CurrencyPicker({ value, onChange }: CurrencyPickerProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[100px] h-9 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {CURRENCIES.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            {c.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
