import Image from "next/image";

export function CoverPanel() {
  return (
    <div className="@container/cover relative hidden h-full w-full overflow-hidden @xl/outer:block">
      <Image
        src="/authentication-bg.webp"
        alt="Cover"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Logo */}
      <div className="absolute top-8 left-8 flex items-center gap-2.5 @xl/cover:top-10 @xl/cover:left-10">
        <div className="flex size-8 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
          <div className="size-3 rounded-sm bg-white" />
        </div>
        <span className="text-sm font-semibold text-white drop-shadow">
          Acme Inc.
        </span>
      </div>
    </div>
  );
}
