"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";

interface ProfileTabsProps {
  profiles: string[];
  activeProfile: string;
  onSelect: (profile: string) => void;
  onAddProfile: (name: string) => void;
  onDeleteProfile: (name: string) => void;
}

export default function ProfileTabs({
  profiles,
  activeProfile,
  onSelect,
  onAddProfile,
  onDeleteProfile,
}: ProfileTabsProps) {
  const { t } = useTranslation();
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  function handleAdd() {
    const trimmed = newName.trim();
    if (!trimmed || profiles.includes(trimmed)) return;
    onAddProfile(trimmed);
    setNewName("");
    setAdding(false);
  }

  function handleDelete(profile: string) {
    onDeleteProfile(profile);
    setConfirmDelete(null);
    if (activeProfile === profile) {
      const remaining = profiles.filter((p) => p !== profile);
      if (remaining.length > 0) onSelect(remaining[0]);
    }
  }

  return (
    <div className="mb-6 space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {profiles.map((profile) => (
          <div key={profile} className="relative group">
            <Button
              size="sm"
              variant={activeProfile === profile ? "default" : "outline"}
              className="rounded-full"
              onClick={() => onSelect(profile)}
            >
              {profile}
            </Button>
            {profiles.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(profile);
                }}
                className={`absolute -top-1.5 -right-1.5 items-center justify-center w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] leading-none ${activeProfile === profile ? "flex" : "hidden group-hover:flex"}`}
                aria-label={`Delete ${profile} profile`}
              >
                &times;
              </button>
            )}
          </div>
        ))}
        {adding ? (
          <div className="flex items-center gap-1">
            <Input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
                if (e.key === "Escape") { setAdding(false); setNewName(""); }
              }}
              placeholder={t("profilePlaceholder")}
              autoFocus
              className="rounded-full w-32 h-8"
            />
            <Button size="sm" className="rounded-full" onClick={handleAdd}>
              {t("add")}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={() => { setAdding(false); setNewName(""); }}
            >
              {t("cancel")}
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="rounded-full border-dashed text-muted-foreground"
            onClick={() => setAdding(true)}
            aria-label="Add new profile"
          >
            +
          </Button>
        )}
      </div>

      {confirmDelete && (
        <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          <span dangerouslySetInnerHTML={{ __html: t("deleteProfileConfirm", { name: confirmDelete }) }} />
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(confirmDelete)}
          >
            {t("delete")}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setConfirmDelete(null)}
          >
            {t("cancel")}
          </Button>
        </div>
      )}
    </div>
  );
}
