"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

export default function HowToUse() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full text-left"
          aria-expanded={open}
          aria-label="Toggle how to use instructions"
        >
          <h2 className="text-sm font-semibold text-card-foreground">{t("howToUse")}</h2>
          <svg
            className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="mt-3 space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">1.</span>
              <p dangerouslySetInnerHTML={{ __html: t("howToStep1") }} />
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">2.</span>
              <p dangerouslySetInnerHTML={{ __html: t("howToStep2") }} />
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">3.</span>
              <p dangerouslySetInnerHTML={{ __html: t("howToStep3") }} />
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">4.</span>
              <p dangerouslySetInnerHTML={{ __html: t("howToStep4") }} />
            </div>
            <div className="rounded-lg bg-muted p-3 mt-2">
              <p className="text-xs" dangerouslySetInnerHTML={{ __html: t("privacyNote") }} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
