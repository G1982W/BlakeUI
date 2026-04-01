"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogBasicDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="primary">
          Open dialog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-muted-foreground text-sm">
            Dialog content goes here.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" variant="primary">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
(DialogBasicDemo as { source?: string }).source = String.raw`<Dialog>
  <DialogTrigger asChild>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>...</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

/** Minimal title + description + single confirm (for the “Basic” example section). */
export function DialogMinimalDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="primary">
          Open dialog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>
            A short description for the dialog.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="primary">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
(DialogMinimalDemo as { source?: string }).source = String.raw`<DialogContent>
  <DialogHeader>
    <DialogTitle>Dialog title</DialogTitle>
    <DialogDescription>A short description.</DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button>Confirm</Button>
  </DialogFooter>
</DialogContent>`;

/** Hide the default corner close control and use your own `DialogClose` (e.g. in the header). */
export function DialogCustomCloseDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="primary">
          Share
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="gap-0 p-0">
        <div className="flex items-center justify-between gap-4 border-b px-6 py-4">
          <DialogTitle className="text-left">Share this link</DialogTitle>
          <DialogClose asChild>
            <Button type="button" variant="ghost" size="sm">
              Done
            </Button>
          </DialogClose>
        </div>
        <div className="px-6 py-4">
          <DialogDescription className="text-left">
            Anyone with the link can view this document.
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
(DialogCustomCloseDemo as { source?: string }).source =
  String.raw`<DialogContent showCloseButton={false}>
  <DialogClose asChild>
    <Button variant="ghost" size="sm">Done</Button>
  </DialogClose>
</DialogContent>`;

/** Use `showCloseButton={false}` to remove the built-in close button (e.g. force a choice from the footer). */
export function DialogNoCloseDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary">
          No close button
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>
            This dialog has no corner close control. Use the actions below to
            continue or cancel.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" variant="primary">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
(DialogNoCloseDemo as { source?: string }).source =
  String.raw`<DialogContent showCloseButton={false}>
  ...
</DialogContent>`;

/** Header and footer stay visible; the middle section scrolls. */
export function DialogStickyFooterDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="primary">
          Sticky footer
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[min(520px,85vh)] w-full max-w-lg flex-col gap-0 overflow-hidden p-0"
      >
        <DialogHeader className="shrink-0 border-b border-border px-6 py-4 text-left">
          <DialogTitle>Terms of use</DialogTitle>
          <DialogDescription>
            Scroll the section below—the actions stay at the bottom.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {Array.from({ length: 12 }, (_, i) => (
              <React.Fragment key={i}>
                Paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
                {i < 11 ? (
                  <>
                    <br />
                    <br />
                  </>
                ) : null}
              </React.Fragment>
            ))}
          </p>
        </div>
        <DialogFooter className="shrink-0 flex-row justify-end border-border px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Decline
            </Button>
          </DialogClose>
          <Button type="button" variant="primary">
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
(DialogStickyFooterDemo as { source?: string }).source =
  String.raw`<DialogContent className="flex max-h-[85vh] flex-col overflow-hidden p-0">
  <DialogHeader className="border-b">...</DialogHeader>
  <div className="min-h-0 flex-1 overflow-y-auto">...</div>
  <DialogFooter className="border-t">...</DialogFooter>
</DialogContent>`;

/** Long body scrolls while the title and description stay at the top. */
export function DialogScrollableDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="primary">
          Scrollable content
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden">
        <DialogHeader className="shrink-0">
          <DialogTitle>Release notes</DialogTitle>
          <DialogDescription>
            The header stays fixed while you scroll the list below.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
          <ul className="text-muted-foreground list-inside list-disc space-y-3 text-sm">
            {Array.from({ length: 24 }, (_, i) => (
              <li key={i}>
                Change {i + 1}: Improved performance and accessibility across
                the board.
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
(DialogScrollableDemo as { source?: string }).source =
  String.raw`<DialogContent className="flex max-h-[85vh] flex-col overflow-hidden">
  <DialogHeader>...</DialogHeader>
  <div className="min-h-0 flex-1 overflow-y-auto">...</div>
</DialogContent>`;

export function DialogRtlDemo() {
  return (
    <div dir="rtl" className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="primary">
            فتح الحوار
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل الملف الشخصي</DialogTitle>
            <DialogDescription>
              قم بإجراء التغييرات على ملفك الشخصي هنا. انقر حفظ عند الانتهاء.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button type="button" variant="primary">
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
(DialogRtlDemo as { source?: string }).source = String.raw`<div dir="rtl">
  <Dialog>...</Dialog>
</div>`;
