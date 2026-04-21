export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {children}
    </div>
  );
}
