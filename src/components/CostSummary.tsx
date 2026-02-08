"use client";

import type { Subscription } from "@/types/subscription";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatCurrency";
import { useTranslation } from "@/hooks/useTranslation";

interface CostSummaryProps {
  subscriptions: Subscription[];
  currency: string;
}

export default function CostSummary({ subscriptions, currency }: CostSummaryProps) {
  const { t } = useTranslation();

  const totalMonthly = subscriptions.reduce((sum, sub) => {
    return sum + (sub.cycle === "monthly" ? sub.cost : sub.cost / 12);
  }, 0);

  const totalAnnual = subscriptions.reduce((sum, sub) => {
    return sum + (sub.cycle === "annual" ? sub.cost : sub.cost * 12);
  }, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground mb-1">{t("monthlyCost")}</p>
          <p className="text-2xl font-bold text-card-foreground">
            {formatCurrency(totalMonthly, currency)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground mb-1">{t("annualCost")}</p>
          <p className="text-2xl font-bold text-card-foreground">
            {formatCurrency(totalAnnual, currency)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground mb-1">{t("subscriptions")}</p>
          <p className="text-2xl font-bold text-card-foreground">
            {subscriptions.length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
