"use client";

import { useState } from "react";
import type { Subscription, Cycle } from "@/types/subscription";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";

interface AddSubscriptionFormProps {
  onAdd: (sub: Omit<Subscription, "id">) => void;
  activeProfile: string;
  categories: string[];
  currency: string;
  onAddCategory: (name: string) => void;
}

export default function AddSubscriptionForm({
  onAdd,
  activeProfile,
  categories,
  currency,
  onAddCategory,
}: AddSubscriptionFormProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const [category, setCategory] = useState(categories[0] ?? "Other");
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !cost) return;

    onAdd({ name: name.trim(), cost: Number(cost), cycle, category, profile: activeProfile });
    setName("");
    setCost("");
    setCycle("monthly");
    setCategory(categories[0] ?? "Other");
  }

  function handleCategoryChange(value: string) {
    if (value === "__custom__") {
      setAddingCategory(true);
      return;
    }
    setCategory(value);
  }

  function handleAddCategory() {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    onAddCategory(trimmed);
    setCategory(trimmed);
    setNewCategoryName("");
    setAddingCategory(false);
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-card-foreground">
            {t("addSubscription")}
          </h2>
          <Badge
            className="border-transparent"
            style={{
              backgroundColor: "hsl(var(--cat-profile-bg))",
              color: "hsl(var(--cat-profile-fg))",
            }}
          >
            {activeProfile}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">{t("name")}</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">{t("cost")} ({currency})</label>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                max="999999999"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="9.99"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">{t("cycle")}</label>
              <Select value={cycle} onValueChange={(v) => setCycle(v as Cycle)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">{t("monthly")}</SelectItem>
                  <SelectItem value="annual">{t("annual")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">{t("category")}</label>
              {addingCategory ? (
                <div className="flex items-center gap-1">
                  <Input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") { e.preventDefault(); handleAddCategory(); }
                      if (e.key === "Escape") { setAddingCategory(false); setNewCategoryName(""); }
                    }}
                    placeholder={t("categoryPlaceholder")}
                    autoFocus
                    className="h-9"
                  />
                  <Button type="button" size="sm" onClick={handleAddCategory}>
                    OK
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => { setAddingCategory(false); setNewCategoryName(""); }}>
                    X
                  </Button>
                </div>
              ) : (
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                    <SelectItem value="__custom__">{t("customCategory")}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div>
              <Button type="submit" className="w-full">
                {t("add")}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
