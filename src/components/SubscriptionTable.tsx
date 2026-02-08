"use client";

import { useState } from "react";
import type { Subscription, Cycle } from "@/types/subscription";
import { formatCurrency } from "@/lib/formatCurrency";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";

const CATEGORY_COLORS: Record<string, { bg: string; fg: string }> = {
  Streaming: { bg: "var(--cat-streaming-bg)", fg: "var(--cat-streaming-fg)" },
  Software: { bg: "var(--cat-software-bg)", fg: "var(--cat-software-fg)" },
  Music: { bg: "var(--cat-music-bg)", fg: "var(--cat-music-fg)" },
  Other: { bg: "var(--cat-other-bg)", fg: "var(--cat-other-fg)" },
};

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  categories: string[];
  currency: string;
  onUpdate: (id: string, updates: Partial<Subscription>) => void;
  onDelete: (id: string) => void;
  onAddCategory: (name: string) => void;
}

export default function SubscriptionTable({
  subscriptions,
  categories,
  currency,
  onUpdate,
  onDelete,
  onAddCategory,
}: SubscriptionTableProps) {
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Subscription>>({});
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  function startEdit(sub: Subscription) {
    setEditingId(sub.id);
    setEditData({ name: sub.name, cost: sub.cost, cycle: sub.cycle, category: sub.category, profile: sub.profile });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditData({});
    setAddingCategory(false);
    setNewCategoryName("");
  }

  function saveEdit(id: string) {
    onUpdate(id, editData);
    setEditingId(null);
    setEditData({});
    setAddingCategory(false);
    setNewCategoryName("");
  }

  function handleDelete(id: string) {
    onDelete(id);
  }

  function handleKeyDown(e: React.KeyboardEvent, id: string) {
    if (e.key === "Enter") saveEdit(id);
    if (e.key === "Escape") cancelEdit();
  }

  if (subscriptions.length === 0) {
    return (
      <Card className="p-10 text-center text-muted-foreground">
        {t("noSubscriptions")}
      </Card>
    );
  }

  function getCatColor(category: string) {
    return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Other;
  }

  function handleCategoryChange(value: string) {
    if (value === "__custom__") {
      setAddingCategory(true);
      return;
    }
    setEditData((prev) => ({ ...prev, category: value }));
  }

  function handleAddCategory() {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    onAddCategory(trimmed);
    setEditData((prev) => ({ ...prev, category: trimmed }));
    setNewCategoryName("");
    setAddingCategory(false);
  }

  function cancelAddCategory() {
    setAddingCategory(false);
    setNewCategoryName("");
  }

  function CategoryEditField({ triggerClassName }: { triggerClassName?: string }) {
    if (addingCategory) {
      return (
        <div className="flex items-center gap-1">
          <Input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); handleAddCategory(); }
              if (e.key === "Escape") cancelAddCategory();
            }}
            placeholder={t("categoryPlaceholder")}
            autoFocus
            className="h-8"
          />
          <Button type="button" size="sm" onClick={handleAddCategory}>OK</Button>
          <Button type="button" size="sm" variant="outline" onClick={cancelAddCategory}>X</Button>
        </div>
      );
    }
    return (
      <Select value={editData.category ?? "Other"} onValueChange={handleCategoryChange}>
        <SelectTrigger className={triggerClassName}><SelectValue /></SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
          <SelectItem value="__custom__">{t("customCategory")}</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  /* ── Mobile card for a single subscription ── */
  function MobileCard({ sub }: { sub: Subscription }) {
    const isEditing = editingId === sub.id;
    const catColor = getCatColor(sub.category);

    if (isEditing) {
      return (
        <Card className="p-4 space-y-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">{t("name")}</label>
            <Input
              type="text"
              value={editData.name ?? ""}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              onKeyDown={(e) => handleKeyDown(e, sub.id)}
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">{t("cost")} ({currency})</label>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                max="999999999"
                value={editData.cost ?? ""}
                onChange={(e) => setEditData({ ...editData, cost: Number(e.target.value) })}
                onKeyDown={(e) => handleKeyDown(e, sub.id)}
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">{t("cycle")}</label>
              <Select value={editData.cycle ?? "monthly"} onValueChange={(v) => setEditData({ ...editData, cycle: v as Cycle })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">{t("monthly")}</SelectItem>
                  <SelectItem value="annual">{t("annual")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">{t("category")}</label>
            <CategoryEditField />
          </div>
          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={() => saveEdit(sub.id)}>{t("save")}</Button>
            <Button size="sm" variant="outline" onClick={cancelEdit}>{t("cancel")}</Button>
          </div>
        </Card>
      );
    }

    return (
      <Card
        className="p-4 cursor-pointer"
        onClick={() => startEdit(sub)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-medium truncate">{sub.name}</p>
            <p className="text-lg font-bold mt-0.5">
              {formatCurrency(sub.cost, currency)}
              <span className="text-xs font-normal text-muted-foreground ml-1 capitalize">/ {sub.cycle === "monthly" ? t("mo") : t("yr")}</span>
            </p>
          </div>
          <Badge
            className="border-transparent shrink-0"
            style={{ backgroundColor: `hsl(${catColor.bg})`, color: `hsl(${catColor.fg})` }}
          >
            {sub.category}
          </Badge>
        </div>
        <div className="flex justify-end mt-2">
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => { e.stopPropagation(); handleDelete(sub.id); }}
          >
            {t("delete")}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <>
      {/* Mobile: card list */}
      <div className="flex flex-col gap-3 md:hidden">
        {subscriptions.map((sub) => (
          <MobileCard key={sub.id} sub={sub} />
        ))}
      </div>

      {/* Desktop: table */}
      <Card className="overflow-hidden hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("cost")}</TableHead>
              <TableHead>{t("cycle")}</TableHead>
              <TableHead>{t("category")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub) => {
              const isEditing = editingId === sub.id;
              const catColor = getCatColor(sub.category);
              return (
                <TableRow key={sub.id}>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        type="text"
                        value={editData.name ?? ""}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        onKeyDown={(e) => handleKeyDown(e, sub.id)}
                        className="h-8"
                        autoFocus
                      />
                    ) : (
                      <span
                        className="cursor-pointer hover:text-primary/70"
                        onClick={() => startEdit(sub)}
                      >
                        {sub.name}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        type="number"
                        step="0.01"
                        min="0.01"
                        max="999999999"
                        value={editData.cost ?? ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            cost: Number(e.target.value),
                          })
                        }
                        onKeyDown={(e) => handleKeyDown(e, sub.id)}
                        className="w-24 h-8"
                      />
                    ) : (
                      <span
                        className="cursor-pointer hover:text-primary/70"
                        onClick={() => startEdit(sub)}
                      >
                        {formatCurrency(sub.cost, currency)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Select
                        value={editData.cycle ?? "monthly"}
                        onValueChange={(v) =>
                          setEditData({ ...editData, cycle: v as Cycle })
                        }
                      >
                        <SelectTrigger className="h-8 w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">{t("monthly")}</SelectItem>
                          <SelectItem value="annual">{t("annual")}</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span
                        className="cursor-pointer hover:text-primary/70 capitalize"
                        onClick={() => startEdit(sub)}
                      >
                        {sub.cycle === "monthly" ? t("monthly") : t("annual")}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <CategoryEditField triggerClassName="h-8 w-28" />
                    ) : (
                      <Badge
                        className="border-transparent cursor-pointer"
                        style={{
                          backgroundColor: `hsl(${catColor.bg})`,
                          color: `hsl(${catColor.fg})`,
                        }}
                        onClick={() => startEdit(sub)}
                      >
                        {sub.category}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {isEditing ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => saveEdit(sub.id)}
                        >
                          {t("save")}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                        >
                          {t("cancel")}
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(sub.id)}
                      >
                        {t("delete")}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
