"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import type { TranslationKey } from "@/locales/en";

interface DataToolbarProps {
  onExport: () => void;
  onImport: (file: File) => void;
  importError?: string | null;
  onClearError?: () => void;
}

export default function DataToolbar({
  onExport,
  onImport,
  importError,
  onClearError,
}: DataToolbarProps) {
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      e.target.value = "";
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-card-foreground">{t("yourData")}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("dataDescription")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={onExport} size="sm" aria-label={t("export")}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M17 8l-5-5m0 0L7 8m5-5v12" />
              </svg>
              {t("export")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} aria-label={t("import")}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
              </svg>
              {t("import")}
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
              aria-label={t("import")}
            />
          </div>
        </div>
        {importError && (
          <div className="mt-3 flex items-center justify-between rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            <span>{t(importError as TranslationKey)}</span>
            <button onClick={onClearError} className="ml-2 font-medium hover:underline" aria-label={t("dismiss")}>
              {t("dismiss")}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
