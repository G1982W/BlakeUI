"use client";

import { CourseHeader } from "@/components/app-pages/course-detail page/course-header";
import { CourseCurriculum } from "@/components/app-pages/course-detail page/course-curriculum";
import { CourseDetails } from "@/components/app-pages/course-detail page/course-details";
import { InstructorProfile } from "@/components/app-pages/course-detail page/instructor-profile";
import { VideoPlayer } from "@/components/app-pages/course-detail page/video-player";
import { cn } from "@/lib/utils";

export interface CourseDetailPageProps {
  className?: string;
}

export function CourseDetailPage({ className }: CourseDetailPageProps) {
  return (
    <div className={cn("bg-background min-h-screen w-full", className)}>
      <CourseHeader />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <VideoPlayer />
            <CourseDetails />
            <InstructorProfile />
          </div>

          <div className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-20">
              <CourseCurriculum />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
