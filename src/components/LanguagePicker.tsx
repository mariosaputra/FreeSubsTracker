"use client";

import { useTranslation } from "@/hooks/useTranslation";
import type { Language } from "@/contexts/LanguageContext";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const LANGUAGES: { code: Language; flag: string; label: string }[] = [
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
];

export default function LanguagePicker() {
  const { language, setLanguage } = useTranslation();

  const current = LANGUAGES.find((l) => l.code === language);

  return (
    <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
      <SelectTrigger className="w-[52px] h-9 text-base">
        <span>{current?.flag}</span>
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((l) => (
          <SelectItem key={l.code} value={l.code}>
            {l.flag} {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
