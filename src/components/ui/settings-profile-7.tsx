"use client";

import * as React from "react";
import { z } from "zod";
import { Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const fields = [
  { key: "name", label: "Name", value: "Jane Doe" },
  { key: "username", label: "Username", value: "jane" },
  { key: "email", label: "Email", value: "jane@example.com" },
  { key: "bio", label: "Bio", value: "" },
];

const fieldSchemas: Record<string, z.ZodType<string>> = {
  name: z.string().min(1, "Name is required"),
  username: z.string().min(2, "Username must be at least 2 characters").regex(/^[a-z0-9_-]+$/i, "Username can only contain letters, numbers, underscore and hyphen"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  bio: z.string(),
};

export function SettingsProfile7() {
  const [editKey, setEditKey] = React.useState<string | null>(null);
  const [values, setValues] = React.useState(
    Object.fromEntries(fields.map((f) => [f.key, f.value])),
  );
  const [draft, setDraft] = React.useState("");
  const [error, setError] = React.useState("");

  const startEdit = (key: string, current: string) => {
    setEditKey(key);
    setDraft(current);
    setError("");
  };

  const saveEdit = () => {
    if (!editKey) return;
    const schema = fieldSchemas[editKey];
    if (schema) {
      const result = schema.safeParse(draft);
      if (!result.success) {
        setError(result.error.issues[0]?.message ?? "Invalid value");
        return;
      }
      setValues((prev) => ({ ...prev, [editKey]: result.data ?? draft }));
    } else {
      setValues((prev) => ({ ...prev, [editKey]: draft }));
    }
    setEditKey(null);
    setError("");
  };

  const cancelEdit = () => {
    setEditKey(null);
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, key: string) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border border-border bg-background p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="relative shrink-0">
          <Avatar className="size-14">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button
            variant="primary"
            size="sm"
            className="absolute bottom-0 right-0 size-6 rounded-full p-0"
            aria-label="Edit photo"
          >
            <Pencil className="size-3" />
          </Button>
        </div>
        <div className="min-w-0 flex-1 space-y-0">
          {fields.map((field, i) => (
            <div
              key={field.key}
              className={cn(
                "flex items-center justify-between gap-2 py-2",
                i > 0 && "border-t border-border",
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">
                  {field.label}
                </p>
                {editKey === field.key ? (
                  <div className="mt-0.5 space-y-1">
                    <div className="flex items-center gap-1">
                      <Input
                        value={draft}
                        onChange={(e) => { setDraft(e.target.value); setError(""); }}
                        onBlur={saveEdit}
                        onKeyDown={(e) => handleKeyDown(e, field.key)}
                        className="h-8 text-sm"
                        autoFocus
                        aria-invalid={!!error}
                      />
                    <Button
                      variant="primary"
                      size="sm"
                      className="size-8 p-0"
                      onClick={saveEdit}
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="size-8 bg-transparent p-0 hover:bg-accent"
                      onClick={cancelEdit}
                    >
                      <X className="size-4" />
                    </Button>
                    </div>
                    {error && <p className="text-xs text-destructive">{error}</p>}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => startEdit(field.key, values[field.key] ?? "")}
                    className="group mt-0.5 flex w-full items-center gap-2 text-left text-sm font-medium"
                  >
                    <span className={cn(!values[field.key] && "text-muted-foreground")}>
                      {values[field.key] || "Not set"}
                    </span>
                    <Pencil className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
