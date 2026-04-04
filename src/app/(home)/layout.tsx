import { HomeNavbar } from "@/components/home-navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      {children}
    </div>
  );
}
