"use client";

import { Camera, Check, Pencil, X } from "lucide-react";
import { useState } from "react";

import { FileUpload, FileUploadTrigger } from "@/components/ui/file-upload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ProfileData {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  location?: string;
}

interface SettingsProfile7Props {
  defaultValues?: Partial<ProfileData>;
  className?: string;
}

const SettingsProfile7 = ({
  defaultValues = {
    name: "Alex Morgan",
    email: "alex.morgan@email.com",
    avatar:
      "https://i.pravatar.cc/150?img=8",
    role: "Product Designer",
    location: "San Francisco, CA",
  },
  className,
}: SettingsProfile7Props) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState(defaultValues);
  const [tempValue, setTempValue] = useState("");
  const [avatarFiles, setAvatarFiles] = useState<File[]>([]);

  const avatarPreview =
    avatarFiles.length > 0
      ? URL.createObjectURL(avatarFiles[0])
      : formData.avatar;

  const startEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const saveEdit = (field: keyof ProfileData) => {
    setFormData((prev) => ({ ...prev, [field]: tempValue }));
    setEditingField(null);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue("");
  };

  const initials = formData.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const EditableField = ({
    field,
    label,
    value,
  }: {
    field: keyof ProfileData;
    label: string;
    value?: string;
  }) => {
    const isEditing = editingField === field;

    return (
      <div className="group/field relative flex items-center py-2">
        {/* Reserve space so the value never sits under the edit control; hover/focus applies to this whole block */}
        <div className="relative min-w-0 flex-1 pr-10">
          <p className="text-xs text-muted-foreground">{label}</p>
          {isEditing ? (
            <div className="mt-1 flex items-center gap-2">
              <Input
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="h-8"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(field);
                  if (e.key === "Escape") cancelEdit();
                }}
              />
              <Button
                size="sm"
                variant="ghost"
                className="size-8 shrink-0"
                onClick={() => saveEdit(field)}
              >
                <Check className="size-4 text-green-600" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="size-8 shrink-0"
                onClick={cancelEdit}
              >
                <X className="size-4 text-muted-foreground" />
              </Button>
            </div>
          ) : (
            <p className="truncate text-sm font-medium">
              {value || <span className="text-muted-foreground">Not set</span>}
            </p>
          )}
          {!isEditing && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              aria-label={`Edit ${label}`}
              className={cn(
                "absolute top-1/2 right-0 size-8 -translate-y-1/2 shrink-0 transition-opacity",
                "opacity-0 pointer-events-none",
                "group-hover/field:opacity-100 group-hover/field:pointer-events-auto",
                "group-focus-within/field:opacity-100 group-focus-within/field:pointer-events-auto",
                "focus-visible:opacity-100 focus-visible:pointer-events-auto",
              )}
              onClick={() => startEdit(field, value || "")}
            >
              <Pencil className="size-3.5" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Avatar */}
          <FileUpload
            value={avatarFiles}
            onValueChange={setAvatarFiles}
            accept="image/*"
            maxFiles={1}
            maxSize={2 * 1024 * 1024}
          >
            <div className="relative shrink-0">
              <Avatar className="size-16">
                <AvatarImage alt={formData.name} className="object-cover" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <FileUploadTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -right-1 -bottom-1 size-6 rounded-full shadow-sm"
                >
                  <Camera className="size-3" />
                </Button>
              </FileUploadTrigger>
            </div>
          </FileUpload>

          {/* Editable Fields */}
          <div className="min-w-0 flex-1 divide-y">
            <EditableField field="name" label="Name" value={formData.name} />
            <EditableField field="role" label="Role" value={formData.role} />
            <EditableField field="email" label="Email" value={formData.email} />
            <EditableField
              field="location"
              label="Location"
              value={formData.location}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { SettingsProfile7 };
