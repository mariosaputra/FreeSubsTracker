"use client";

import { useMemo, useState } from "react";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CostSummary from "@/components/CostSummary";
import AddSubscriptionForm from "@/components/AddSubscriptionForm";
import SubscriptionTable from "@/components/SubscriptionTable";
import ProfileTabs from "@/components/ProfileTabs";
import DataToolbar from "@/components/DataToolbar";
import ThemeToggle from "@/components/ThemeToggle";
import CurrencyPicker from "@/components/CurrencyPicker";
import LanguagePicker from "@/components/LanguagePicker";
import HowToUse from "@/components/HowToUse";

function HomeContent() {
  const {
    subscriptions,
    profiles,
    categories,
    currency,
    setCurrency,
    loaded,
    importError,
    clearImportError,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    addProfile,
    deleteProfile,
    addCategory,
    exportData,
    importData,
  } = useSubscriptions();

  const { t } = useTranslation();

  const [activeProfile, setActiveProfile] = useState<string>(profiles[0] ?? "Personal");

  const filtered = useMemo(() => {
    return subscriptions
      .filter((s) => s.profile === activeProfile)
      .toSorted((a, b) => a.name.localeCompare(b.name));
  }, [subscriptions, activeProfile]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t("appName")}</h1>
            <p className="text-sm text-muted-foreground">{t("appTagline")}</p>
          </div>
          <div className="flex items-center gap-2">
            <LanguagePicker />
            <CurrencyPicker value={currency} onChange={setCurrency} />
            <ThemeToggle />
          </div>
        </div>
        <HowToUse />
        <DataToolbar
          onExport={exportData}
          onImport={importData}
          importError={importError}
          onClearError={clearImportError}
        />
        <ProfileTabs
          profiles={profiles}
          activeProfile={activeProfile}
          onSelect={setActiveProfile}
          onAddProfile={addProfile}
          onDeleteProfile={deleteProfile}
        />
        <CostSummary subscriptions={filtered} currency={currency} />
        <AddSubscriptionForm
          onAdd={addSubscription}
          activeProfile={activeProfile}
          categories={categories}
          currency={currency}
          onAddCategory={addCategory}
        />
        <SubscriptionTable
          subscriptions={filtered}
          categories={categories}
          currency={currency}
          onUpdate={updateSubscription}
          onDelete={deleteSubscription}
          onAddCategory={addCategory}
        />
        <footer className="mt-12 pb-4 text-center text-xs text-muted-foreground space-y-1">
          <p>
            {t("builtBy")}{" "}
            <a
              href="https://x.com/xmarioapps"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              @xmarioapps
            </a>
          </p>
          <p>
            {t("openSourceText")}{" "}
            <a
              href="https://github.com/mariosaputra/FreeSubsTracker"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              {t("github")}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
