import type { Metadata } from "next";
import { DM_Serif_Display, Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { DataContextProvider } from "@/services/context";

const dm_serif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif"
});

const quicksand = Quicksand({
  weight: ["300", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand"
});

export const metadata: Metadata = {
  title: "Sync",
  description: "Music Classes Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dm_serif.variable} ${quicksand.variable}`}>
        <DataContextProvider>
          <Navbar />
          {children}
        </DataContextProvider>
      </body>
    </html >
  );
}
