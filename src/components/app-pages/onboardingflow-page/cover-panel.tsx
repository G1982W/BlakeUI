import Image from "next/image";

export function CoverPanel() {
  return (
    <div className="relative hidden overflow-hidden md:block">
      <Image
        src="/authentication-bg.png"
        alt="Cover"
        fill
        className="object-cover"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Logo */}
      <div className="absolute top-8 left-8 flex items-center gap-2.5 lg:top-10 lg:left-10">
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
