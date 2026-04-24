import { CourseHeader } from "./components/course-header";
import { VideoPlayer } from "./components/video-player";
import { CourseCurriculum } from "./components/course-curriculum";
import { CourseDetails } from "./components/course-details";
import { InstructorProfile } from "./components/instructor-profile";

export default function CourseDetailPageDemo() {
  return (
    <div className="@container w-full min-h-screen bg-background">
      <CourseHeader />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 @lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-6 @lg:col-span-2">
            <VideoPlayer />
            <CourseDetails />
            <InstructorProfile />
          </div>

          {/* Sidebar — desktop only (mobile uses drawer in header) */}
          <div className="hidden @lg:col-span-1 @lg:block">
            <div className="sticky top-20">
              <CourseCurriculum />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
