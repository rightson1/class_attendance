import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "./client.css";
import Client from "@/components/main/Client";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: " Admin Dashboard",
  manifest: "/manifest.json",
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#Fafafa" },
  ],
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ben">
      <body
        className={`${inter.variable}
        font-inter w-screen overflow-x-hidden `}
      >
        {" "}
        <NextTopLoader
          color="#000000"
          shadow="0 0 10px #000,0 0 5px #000"
          showSpinner={false}
        />
        <Client>{children}</Client>
      </body>
    </html>
  );
}
