"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Clock, Heart, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { lessons } from "../data";

const completedCount = lessons.filter((l) => l.completed).length;
const progressPercent =
  lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

export function CourseCurriculum() {
  const [activeId, setActiveId] = useState(3);
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">Advanced</Badge>
        <Badge variant="outline">Live Class</Badge>
        <Badge variant="outline">{lessons.length} Lessons</Badge>
      </div>

      <Card className="shadow-none">
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <div className="text-muted-foreground flex justify-between text-xs">
              <span>
                {completedCount} of {lessons.length} completed
              </span>
              <span>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-1.5 bg-muted" />
          </div>

          <div className="space-y-2">
            <Button className="w-full gap-2" size="lg">
              <Play />
              Continue Learning
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => setSaved((s) => !s)}
            >
              <Heart
                className={cn("size-4", saved && "fill-current text-rose-500")}
              />
              {saved ? "Saved" : "Save for Later"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Curriculum */}
      <Card className="shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span className="flex items-center gap-2">
              <Play className="text-primary size-4" />
              Course Curriculum
            </span>
            <span className="text-muted-foreground text-xs font-normal">
              {completedCount}/{lessons.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="lg:h-[420px]">
            <div className="pb-2">
              {lessons.map((lesson) => {
                const isActive = lesson.id === activeId;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveId(lesson.id)}
                    className={cn(
                      "hover:bg-muted/40 flex w-full items-start gap-3 border-l-2 px-4 py-3 text-left transition-colors",
                      isActive
                        ? "border-l-primary bg-primary/5"
                        : "border-l-transparent",
                    )}
                  >
                    {/* Status icon */}
                    <div className="mt-0.5 shrink-0">
                      {lesson.completed ? (
                        <CheckCircle2 className="size-4 text-emerald-500" />
                      ) : isActive ? (
                        <div className="bg-primary flex size-4 items-center justify-center rounded-full">
                          <Play className="text-primary-foreground size-2.5 fill-current" />
                        </div>
                      ) : (
                        <Circle className="text-muted-foreground/40 size-4" />
                      )}
                    </div>

                    {/* Title + duration */}
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "truncate text-sm",
                          isActive
                            ? "text-primary font-medium"
                            : lesson.completed
                              ? "text-muted-foreground"
                              : "text-foreground",
                        )}
                      >
                        {lesson.title}
                      </p>
                      <div className="text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Clock className="size-3" />
                        <span className="text-xs">{lesson.duration}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
