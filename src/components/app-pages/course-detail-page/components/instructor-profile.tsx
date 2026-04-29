import { BookOpen, Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const stats = [
  { icon: Star, value: "4.8", label: "Rating" },
  { icon: Users, value: "12,400+", label: "Students" },
  { icon: BookOpen, value: "8", label: "Courses" },
];

export function InstructorProfile() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-base">Instructor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Profile row */}
        <div className="flex gap-4">
          <Avatar className="size-16 shrink-0 rounded-xl">
            <AvatarFallback className="rounded-xl bg-violet-100 text-lg font-semibold text-violet-700 dark:bg-violet-900 dark:text-violet-300">
              DT
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">David Travis</h3>
              <Badge variant="secondary" className="text-xs">
                UX Expert
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              UX Researcher & Course Instructor
            </p>
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="size-3.5 fill-amber-400 text-amber-400"
                />
              ))}
              <Star className="size-3.5 fill-amber-400/50 text-amber-400" />
              <span className="text-muted-foreground ml-1 text-xs">4.8</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-muted/50 rounded-lg border p-3 text-center"
            >
              <Icon className="text-muted-foreground mx-auto mb-1 size-4" />
              <p className="text-sm font-semibold">{value}</p>
              <p className="text-muted-foreground text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Bio */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          I'm on a mission to create more user experience professionals. With
          over 15 years in the field, I've helped thousands of designers develop
          the practical skills and knowledge needed to build products people
          love. My courses blend theory with hands-on practice so you can apply
          what you learn immediately.
        </p>
      </CardContent>
    </Card>
  );
}
