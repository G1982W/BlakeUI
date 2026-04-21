"use client";

import { useState, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TOTAL_SECONDS = 45 * 60 + 32;

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
};

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(23 / TOTAL_SECONDS);
  const progressRef = useRef<HTMLDivElement>(null);

  const currentSeconds = Math.floor(progress * TOTAL_SECONDS);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = progressRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      setProgress(ratio);
    },
    [],
  );

  return (
    <Card className="overflow-hidden py-0 shadow-none">
      <div className="relative aspect-video bg-slate-900">
        {/* Thumbnail */}
        <img
          src="https://plus.unsplash.com/premium_photo-1682126202084-f23c6cee5dbc?q=80&w=2940&auto=format&fit=crop"
          alt="Course preview"
          className="h-full w-full object-cover opacity-80"
        />

        {/* Bottom gradient */}
        <div className="absolute right-0 bottom-0 left-0 h-24 bg-linear-to-t from-black/80 to-transparent" />

        {/* Center play/pause button */}
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 active:scale-95"
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/60 backdrop-blur-sm">
            {isPlaying ? (
              <Pause className="size-6 fill-white text-white" />
            ) : (
              <Play className="ml-1 size-6 fill-white text-white" />
            )}
          </div>
        </button>

        {/* Bottom controls */}
        <div className="absolute right-0 bottom-0 left-0 px-4 pb-3">
          {/* Progress bar */}
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="group mb-3 h-1 cursor-pointer rounded-full bg-white/30 transition-all hover:h-1.5"
          >
            <div
              className="relative h-full rounded-full bg-white transition-all"
              style={{ width: `${progress * 100}%` }}
            >
              <div className="absolute top-1/2 right-0 size-3 translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white shadow transition-transform group-hover:scale-100" />
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="size-7 text-white hover:bg-white/20"
                onClick={() => setIsPlaying((p) => !p)}
              >
                {isPlaying ? (
                  <Pause className="size-4" />
                ) : (
                  <Play className="size-4" />
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="size-7 text-white hover:bg-white/20"
                onClick={() => setIsMuted((m) => !m)}
              >
                {isMuted ? (
                  <VolumeX className="size-4" />
                ) : (
                  <Volume2 className="size-4" />
                )}
              </Button>
              <span className={cn("text-xs tabular-nums", "text-white/90")}>
                {formatTime(currentSeconds)} / {formatTime(TOTAL_SECONDS)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="size-7 text-white hover:bg-white/20"
              >
                <Settings className="size-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="size-7 text-white hover:bg-white/20"
              >
                <Maximize className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
