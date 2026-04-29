import { BookOpen, Clock, Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const stats = [
  { icon: Star, value: "4.8", label: "Rating", color: "text-amber-500" },
  { icon: Users, value: "3,241", label: "Students", color: "text-blue-500" },
  { icon: BookOpen, value: "12", label: "Lessons", color: "text-violet-500" },
  { icon: Clock, value: "2h 15m", label: "Total", color: "text-emerald-500" },
];

const learnings = [
  "Plan and conduct effective usability tests from scratch",
  "Analyze test results and translate them into design improvements",
  "Apply UX laws and heuristics to evaluate interfaces",
  "Navigate privacy regulations and accessibility standards",
  "Create ethical and legally compliant digital experiences",
];

export function CourseDetails() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <CardTitle className="text-xl font-bold text-balance sm:text-2xl">
            The Ultimate Guide to Usability Testing and UX Law
          </CardTitle>
          <Badge variant="secondary" className="shrink-0">
            Advanced
          </Badge>
        </div>

        {/* Stats row */}
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="bg-muted/50 flex items-start gap-2 rounded-lg border px-3 py-3"
            >
              <Icon className={`size-4 shrink-0 ${color}`} />
              <div className="space-y-1">
                <p className="text-sm font-semibold leading-none">{value}</p>
                <p className="text-muted-foreground text-xs">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <p className="text-muted-foreground text-sm leading-relaxed">
          In this comprehensive course, we'll delve into the fundamentals of
          usability testing and explore the critical principles of UX law.
          Whether you're a seasoned UX professional or just starting out, this
          course equips you with the skills needed to excel in the field.
        </p>

        <Separator />

        {/* What you'll learn */}
        <div className="space-y-3">
          <h3 className="font-semibold">What you'll learn</h3>
          <ul className="space-y-2">
            {learnings.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <span className="bg-primary/10 text-primary mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                  ✓
                </span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <h3 className="font-semibold">Usability Testing</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Learn to plan, conduct, and analyze usability tests using various
              methods and tools, with hands-on exercises and real-world case
              studies.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-semibold">UX Law</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Understand privacy regulations, accessibility standards, and
              copyright laws to build ethical and inclusive digital experiences.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
