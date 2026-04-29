"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CourseCurriculum } from "./course-curriculum";
import { CircleProgress } from "./circle-progress";
import { lessons } from "../data";

const completedCount = lessons.filter((l) => l.completed).length;
const progress = Math.round((completedCount / lessons.length) * 100);

export function CourseHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="bg-background/95 sticky top-0 z-50 border-b backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Left: back + title */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span className="hidden @sm:inline">Courses</span>
              </Button>
              <div className="bg-border hidden h-5 w-px @sm:block" />
              <h1 className="text-foreground min-w-0 flex-1 truncate text-sm font-medium @sm:text-base">
                The Ultimate Guide to Usability Testing and UX Law
              </h1>
            </div>

            {/* Mobile: curriculum drawer trigger */}
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 gap-2 @lg:hidden"
              onClick={() => setOpen(true)}
            >
              <CircleProgress value={progress} size={22} strokeWidth={2} />
              <span className="hidden text-sm @sm:inline">Curriculum</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile curriculum drawer */}
      <Drawer open={open} onOpenChange={setOpen} direction="bottom">
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="pb-2">
            <DrawerTitle>Course Curriculum</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-6">
            <CourseCurriculum />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
