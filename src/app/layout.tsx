import type { Metadata } from "next";
import { Libre_Baskerville, DM_Sans } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IAM BioWell — Concierge Wellness & Longevity",
  description:
    "In-home consultations, lab draws, health scans, and customized action plans. Regenerative peptides, IV therapy, and advanced diagnostics for cellular repair and longevity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-white selection:bg-highlight selection:text-cello">
        {children}
      </body>
    </html>
  );
}
