import { cn } from "@/lib/utils";

export default function TwitterIcon({
  className,
}: { className?: string } = {}) {
  return (
    <svg
      aria-hidden="true"
      className={cn(className, "size-4")}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.637 7.584H.474l8.598-9.83L0 1.154h7.594l5.243 6.932zm-1.291 19.493h2.04L6.486 3.24H4.298z" />
    </svg>
  );
}
