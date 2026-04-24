import { cn } from "@/lib/utils";
import { CourseHeader } from "./components/course-header";
import { VideoPlayer } from "./components/video-player";
import { CourseCurriculum } from "./components/course-curriculum";
import { CourseDetails } from "./components/course-details";
import { InstructorProfile } from "./components/instructor-profile";

export default function CourseDetailPageDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "@container min-w-0 w-full bg-background",
        className,
      )}
    >
      <CourseHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid grid-cols-1 gap-6 @lg:grid-cols-3 @lg:gap-8">
          <div className="min-w-0 space-y-6 @lg:col-span-2">
            <VideoPlayer />
            <CourseDetails />
            <InstructorProfile />
          </div>

          <div className="hidden min-w-0 @lg:col-span-1 @lg:block">
            <div className="sticky top-20">
              <CourseCurriculum />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
