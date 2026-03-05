"use client";

import * as React from "react";
import { Upload, ArrowRight, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sourceColumns = ["First Name", "Last Name", "Email", "Company"];
const targetFields = ["firstName", "lastName", "email", "company"];

export function FieldMapping1() {
  const [mappingOpen, setMappingOpen] = React.useState(false);
  const [mapping, setMapping] = React.useState<Record<string, string>>({});
  const [previewColumn, setPreviewColumn] = React.useState<string | null>(null);

  const previewSamples: Record<string, string[]> = {
    "First Name": ["John", "Jane", "Alex"],
    "Last Name": ["Doe", "Smith", "Chen"],
    "Email": ["john@example.com", "jane@example.com", "alex@example.com"],
    "Company": ["Acme", "Beta", "Gamma"],
  };

  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <div className="relative min-h-[200px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Column A</TableHead>
              <TableHead>Column B</TableHead>
              <TableHead>Column C</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                No data imported
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm">
          <Dialog open={mappingOpen} onOpenChange={setMappingOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm" className="gap-2">
                <Upload className="size-4" />
                Browse files
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl" showClose={true}>
              <DialogHeader className="flex flex-row items-center justify-between gap-4">
                <DialogTitle>Map columns to fields</DialogTitle>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" onClick={() => setMappingOpen(false)}>
                    <X className="size-4" />
                    Exit
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Save className="size-4" />
                    Save
                  </Button>
                </div>
              </DialogHeader>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <p className="text-xs font-medium text-muted-foreground">Source columns</p>
                  <div className="space-y-2">
                    {sourceColumns.map((col) => (
                      <div
                        key={col}
                        className="flex items-center justify-between gap-4 rounded-md border border-border bg-muted/30 px-3 py-2"
                      >
                        <Badge variant="secondary">{col}</Badge>
                        <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                        <div className="min-w-0 flex-1">
                          <Combobox
                            items={targetFields.map((f) => ({ value: f, label: f }))}
                            value={mapping[col]}
                            onValueChange={(v) => {
                              setMapping((prev) => ({ ...prev, [col]: v }));
                              setPreviewColumn(col);
                            }}
                            placeholder="Select field..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Preview</p>
                  {previewColumn && previewSamples[previewColumn] ? (
                    <ul className="space-y-1 text-sm">
                      {previewSamples[previewColumn].map((val, i) => (
                        <li key={i} className="truncate font-mono text-muted-foreground">{val}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">Select a column to see sample values.</p>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
