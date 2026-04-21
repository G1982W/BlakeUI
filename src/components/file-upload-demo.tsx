"use client";

import * as React from "react";
import {
  FileUpload,
  FileUploadClear,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
  useFileUpload,
} from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";

function FileUploadItems() {
  const files = useFileUpload((state) => Array.from(state.files.keys()));

  return (
    <>
      {files.map((file) => (
        <FileUploadItem key={`${file.name}-${file.size}`} value={file}>
          <FileUploadItemPreview />
          <FileUploadItemMetadata />
          <div className="ms-auto flex items-center gap-2">
            <div className="w-28">
              <FileUploadItemProgress />
            </div>
            <FileUploadItemDelete asChild>
              <Button size="sm" variant="secondary">
                Remove
              </Button>
            </FileUploadItemDelete>
          </div>
        </FileUploadItem>
      ))}
    </>
  );
}

export function FileUploadDemo({ className }: { className?: string }) {
  return (
    <FileUpload
      className={className}
      multiple
      accept="image/*"
      maxFiles={4}
      maxSize={5 * 1024 * 1024}
      onUpload={async (incoming, { onProgress, onSuccess }) => {
        for (const file of incoming) {
          for (let p = 0; p <= 100; p += 10) {
            await new Promise((r) => setTimeout(r, 40));
            onProgress(file, p);
          }
          onSuccess(file);
        }
      }}
    >
      <FileUploadDropzone className="rounded-lg bg-muted/30">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium">Upload files</p>
            <p className="text-xs text-muted-foreground">
              Drag & drop or browse. Images only, up to 5MB.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FileUploadTrigger asChild>
              <Button size="sm" variant="secondary">
                Browse
              </Button>
            </FileUploadTrigger>
            <FileUploadClear asChild>
              <Button size="sm" variant="primary">
                Clear
              </Button>
            </FileUploadClear>
          </div>
        </div>
      </FileUploadDropzone>

      <FileUploadList className="mt-3">
        <FileUploadItems />
      </FileUploadList>
    </FileUpload>
  );
}


