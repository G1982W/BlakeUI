import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DatabaseIcon,
  GlobeIcon,
  FileSpreadsheetIcon,
  CloudIcon,
} from "lucide-react";

interface StepDataSourceProps {
  onContinue: () => void;
  onBack: () => void;
}

const sources = [
  { id: "api", label: "REST API", icon: GlobeIcon },
  { id: "database", label: "Database", icon: DatabaseIcon },
  { id: "spreadsheet", label: "Spreadsheet", icon: FileSpreadsheetIcon },
  { id: "cloud", label: "Cloud Storage", icon: CloudIcon },
];

export const StepDataSource = ({ onContinue, onBack }: StepDataSourceProps) => {
  const [selected, setSelected] = useState("api");
  const [connectionUrl, setConnectionUrl] = useState("");

  return (
    <div className="flex min-h-full flex-1 items-start justify-center p-6 @sm:p-8 @lg:p-16">
      <div className="w-full max-w-xl">
        <div className="mb-10 @lg:mb-16">
          <h1 className="text-foreground mb-3 text-2xl leading-tight font-semibold @sm:text-3xl @lg:text-4xl">
            Connect your data source
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Choose where your data lives. You can always add more sources later.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-2 @sm:gap-3">
          {sources.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border p-4 transition-all @sm:p-6",
                  selected === s.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40",
                )}
              >
                <Icon
                  className={cn(
                    "size-6",
                    selected === s.id
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                />
                <span className="text-foreground text-sm font-medium">
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mb-10 @lg:mb-16">
          <Label htmlFor="connection-url" className="mb-2">
            Connection URL
          </Label>
          <Input
            id="connection-url"
            placeholder="https://api.example.com/v1"
            value={connectionUrl}
            onChange={(e) => setConnectionUrl(e.target.value)}
          />
          <p className="text-muted-foreground mt-2 text-xs">
            Enter the endpoint or connection string for your data source.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="primary" onClick={onBack} size="lg">
            <ChevronLeftIcon className="size-4" />
            Back
          </Button>
          <Button
            onClick={onContinue}
            className="flex flex-1 justify-between"
            size="lg"
          >
            Continue
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
