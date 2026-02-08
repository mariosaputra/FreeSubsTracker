"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { Subscription } from "@/types/subscription";
import { CURRENCIES } from "@/lib/formatCurrency";

const CURRENCY_KEY = "freesubstracker-currency";
const DEFAULT_PROFILES = ["Personal", "Business"];
const MAX_IMPORT_SIZE = 5 * 1024 * 1024; // 5MB

function storageKey(currency: string) {
  return `freesubstracker-data-${currency}`;
}
function profilesKey(currency: string) {
  return `freesubstracker-profiles-${currency}`;
}
function categoriesKey(currency: string) {
  return `freesubstracker-categories-${currency}`;
}

interface StoredData {
  subscriptions: Subscription[];
  profiles: string[];
  categories: string[];
}

function isValidSubscription(s: unknown): s is Subscription {
  if (typeof s !== "object" || s === null) return false;
  const obj = s as Record<string, unknown>;
  return (
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.cost === "number" &&
    isFinite(obj.cost) &&
    obj.cost >= 0 &&
    (obj.cycle === "monthly" || obj.cycle === "annual") &&
    typeof obj.category === "string" &&
    typeof obj.profile === "string"
  );
}

function safeSave(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // QuotaExceededError — storage full
  }
}

function loadForCurrency(currency: string): StoredData {
  if (typeof window === "undefined") {
    return { subscriptions: [], profiles: [], categories: [] };
  }

  const raw = localStorage.getItem(storageKey(currency));
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const arr = Array.isArray(parsed) ? parsed : parsed.subscriptions ?? [];
      const subs: Subscription[] = arr.filter(isValidSubscription);
      const savedProfiles = localStorage.getItem(profilesKey(currency));
      const profiles: string[] = savedProfiles ? JSON.parse(savedProfiles) : [];
      const savedCategories = localStorage.getItem(categoriesKey(currency));
      const categories: string[] = savedCategories ? JSON.parse(savedCategories) : [];
      return { subscriptions: subs, profiles, categories };
    } catch {
      // corrupted data
    }
  }

  return { subscriptions: [], profiles: [], categories: [] };
}

function saveSubscriptions(currency: string, subs: Subscription[]) {
  safeSave(storageKey(currency), JSON.stringify(subs));
}

function saveProfiles(currency: string, profiles: string[]) {
  safeSave(profilesKey(currency), JSON.stringify(profiles));
}

function saveCategories(currency: string, categories: string[]) {
  safeSave(categoriesKey(currency), JSON.stringify(categories));
}

export function useSubscriptions() {
  const [currency, setCurrencyState] = useState("USD");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [customProfiles, setCustomProfiles] = useState<string[]>([]);
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Load saved currency + its data on mount
  useEffect(() => {
    const saved = localStorage.getItem(CURRENCY_KEY) ?? "USD";
    setCurrencyState(saved);
    const data = loadForCurrency(saved);
    setSubscriptions(data.subscriptions);
    setCustomProfiles(data.profiles);
    setCustomCategories(data.categories);
    setLoaded(true);
  }, []);

  // Switch currency: load the new currency's data
  const setCurrency = useCallback((code: string) => {
    setCurrencyState(code);
    safeSave(CURRENCY_KEY, code);
    const data = loadForCurrency(code);
    setSubscriptions(data.subscriptions);
    setCustomProfiles(data.profiles);
    setCustomCategories(data.categories);
  }, []);

  // Persist subscriptions on change (keyed by current currency)
  useEffect(() => {
    if (loaded) saveSubscriptions(currency, subscriptions);
  }, [subscriptions, loaded, currency]);

  // Persist profiles on change
  useEffect(() => {
    if (loaded) saveProfiles(currency, customProfiles);
  }, [customProfiles, loaded, currency]);

  // Persist categories on change
  useEffect(() => {
    if (loaded) saveCategories(currency, customCategories);
  }, [customCategories, loaded, currency]);

  const categories = useMemo(() => {
    const fromData = new Set(subscriptions.map((s) => s.category));
    const all = new Set([...fromData, ...customCategories]);
    return Array.from(all);
  }, [subscriptions, customCategories]);

  const profiles = useMemo(() => {
    const fromData = new Set(subscriptions.map((s) => s.profile));
    const all = new Set([...DEFAULT_PROFILES, ...customProfiles, ...fromData]);
    return Array.from(all).sort();
  }, [subscriptions, customProfiles]);

  const addSubscription = useCallback(
    (sub: Omit<Subscription, "id">) => {
      const cost = Math.max(0, Math.min(sub.cost, 999_999_999));
      const newSub: Subscription = { ...sub, cost, id: crypto.randomUUID() };
      setSubscriptions((prev) => [...prev, newSub]);
      return newSub;
    },
    []
  );

  const updateSubscription = useCallback(
    (id: string, updates: Partial<Subscription>) => {
      if (updates.cost !== undefined) {
        updates = { ...updates, cost: Math.max(0, Math.min(updates.cost, 999_999_999)) };
      }
      setSubscriptions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates, id } : s))
      );
    },
    []
  );

  const deleteSubscription = useCallback((id: string) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const addProfile = useCallback((name: string) => {
    setCustomProfiles((prev) =>
      prev.includes(name) ? prev : [...prev, name]
    );
  }, []);

  const deleteProfile = useCallback((name: string) => {
    setSubscriptions((prev) => prev.filter((s) => s.profile !== name));
    setCustomProfiles((prev) => prev.filter((p) => p !== name));
  }, []);

  const addCategory = useCallback((name: string) => {
    setCustomCategories((prev) =>
      prev.includes(name) ? prev : [...prev, name]
    );
  }, []);

  const clearImportError = useCallback(() => setImportError(null), []);

  const exportData = useCallback(() => {
    // Collect data from all currencies that have data
    const allCurrencies: Record<string, StoredData> = {};
    for (const c of CURRENCIES) {
      const data = loadForCurrency(c.code);
      if (data.subscriptions.length > 0 || data.profiles.length > 0 || data.categories.length > 0) {
        allCurrencies[c.code] = data;
      }
    }
    // Ensure current in-memory state is included (may not be saved yet)
    allCurrencies[currency] = { subscriptions, profiles: customProfiles, categories: customCategories };

    const exportObj = { currencies: allCurrencies, activeCurrency: currency };
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "freesubstracker-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [subscriptions, customProfiles, customCategories, currency]);

  const importData = useCallback((file: File) => {
    setImportError(null);

    if (file.size > MAX_IMPORT_SIZE) {
      setImportError("importErrorTooLarge");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);

        // New multi-currency format: { currencies: { USD: {...}, EUR: {...} } }
        if (parsed.currencies && typeof parsed.currencies === "object") {
          for (const [code, data] of Object.entries(parsed.currencies)) {
            const d = data as Record<string, unknown>;
            const arr = Array.isArray(d.subscriptions) ? d.subscriptions : [];
            const subs: Subscription[] = arr.filter(isValidSubscription);
            const profs: string[] = (Array.isArray(d.profiles) ? d.profiles : []).filter(
              (p: unknown) => typeof p === "string"
            );
            const cats: string[] = (Array.isArray(d.categories) ? d.categories : []).filter(
              (c: unknown) => typeof c === "string"
            );
            saveSubscriptions(code, subs);
            saveProfiles(code, profs);
            saveCategories(code, cats);
          }
          // Switch to the exported active currency or stay on current
          const target = typeof parsed.activeCurrency === "string" && parsed.currencies[parsed.activeCurrency]
            ? parsed.activeCurrency
            : currency;
          setCurrencyState(target);
          safeSave(CURRENCY_KEY, target);
          const data = loadForCurrency(target);
          setSubscriptions(data.subscriptions);
          setCustomProfiles(data.profiles);
          setCustomCategories(data.categories);
          return;
        }

        // Legacy single-currency format: { subscriptions: [...] } or [...]
        const arr = Array.isArray(parsed) ? parsed : parsed.subscriptions ?? [];
        const subs: Subscription[] = arr.filter(isValidSubscription);

        if (arr.length > 0 && subs.length === 0) {
          setImportError("importErrorNoValid");
          return;
        }

        const profs: string[] = (parsed.profiles ?? []).filter(
          (p: unknown) => typeof p === "string"
        );
        const cats: string[] = (parsed.categories ?? []).filter(
          (c: unknown) => typeof c === "string"
        );
        setSubscriptions(subs);
        setCustomProfiles(profs);
        setCustomCategories(cats);
      } catch {
        setImportError("importErrorInvalid");
      }
    };
    reader.readAsText(file);
  }, [currency]);

  return {
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
  };
}
