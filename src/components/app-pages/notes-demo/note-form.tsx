"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CATEGORIES, NOTE_COLORS, type Note, type NoteColor } from "./store";

interface NoteFormProps {
  defaultValues?: Partial<Note>;
  trigger?: React.ReactNode;
  onSubmit: (values: { title: string; content: string; category: string; color: NoteColor }) => void;
}

export function NoteForm({ defaultValues, trigger, onSubmit }: NoteFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [content, setContent] = useState(defaultValues?.content ?? "");
  const [category, setCategory] = useState(defaultValues?.category ?? "Personal");
  const [color, setColor] = useState<NoteColor>(defaultValues?.color ?? "default");

  const reset = () => {
    if (!defaultValues) {
      setTitle("");
      setContent("");
      setCategory("Personal");
      setColor("default");
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), content: content.trim(), category, color });
    setOpen(false);
    reset();
  };

  const handleOpen = (v: boolean) => {
    setOpen(v);
    if (v && defaultValues) {
      setTitle(defaultValues.title ?? "");
      setContent(defaultValues.content ?? "");
      setCategory(defaultValues.category ?? "Personal");
      setColor(defaultValues.color ?? "default");
    }
    if (!v) reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="w-full gap-2">
            <Plus className="size-4" />
            New Note
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="z-10000 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Edit Note" : "New Note"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-10001">
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2 pt-1">
                {(Object.keys(NOTE_COLORS) as NoteColor[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    title={NOTE_COLORS[c].label}
                    onClick={() => setColor(c)}
                    className={cn(
                      "size-6 rounded-full border-2 transition-transform hover:scale-110",
                      NOTE_COLORS[c].dot,
                      color === c ? "border-foreground scale-110" : "border-transparent"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            {defaultValues ? "Save changes" : "Add note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
