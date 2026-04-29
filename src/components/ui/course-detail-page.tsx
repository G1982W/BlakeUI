import CourseDetailApp from "@/components/app-pages/course-detail-page/page";
import { cn } from "@/lib/utils";

export interface CourseDetailPageProps {
  className?: string;
}

export function CourseDetailPage({ className }: CourseDetailPageProps) {
  return (
    <div className={cn("w-full", className)}>
      <CourseDetailApp />
    </div>
  );
}
