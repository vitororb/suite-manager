import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { redirect } from "next/navigation";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = true; // Replace with your actual authentication logic

  if (!isAuthenticated) {
    redirect("/login");
  }

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
