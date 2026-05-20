import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { AIChatWidget } from "@/components/ui/AIChatWidget";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VieGarden",
  description: "Kết nối trải nghiệm nông nghiệp minh bạch qua Live Cam, IoT và AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={beVietnam.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <AIChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
