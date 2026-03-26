import { Footer } from "@/shared/ui/Footer";
import { Navbar } from "@/shared/ui/Navbar";
import { Sidebar } from "@/shared/ui/Sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Navbar />

      <div className="flex flex-1 pr-2">
        <Sidebar />

        <main className="flex-1 bg-[#191A1C] rounded-xl p-4">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
