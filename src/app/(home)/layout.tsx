import { HomeNavbar } from "@/components/home-navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background relative">
      <HomeNavbar className="absolute top-4 left-0 w-full" />
      {children}
    </div>
  );
}
