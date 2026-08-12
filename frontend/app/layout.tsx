import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ResumeModalProvider } from "@/context/ResumeModalContext";
import { WhatsAppChatProvider } from "@/context/WhatsAppChatContext";
import Preloader from "@/components/ui/Preloader";
import ResumeModal from "@/components/ui/ResumeModal";
import ScrollToTop from "@/components/ui/ScrollToTop";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "oyedokun.dev | Kehinde Oyedokun — Software Engineer",
  description:
    "Staff-level Software Engineer. Full-stack development, backend architecture, and scalable systems. Turning complex problems into clean, functional code.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Backend Engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Nigeria",
    "Oyedokun Kehinde",
    "oyedokun.dev",
  ],
  authors: [{ name: "Oyedokun Kehinde" }],
  creator: "Oyedokun Kehinde",
  metadataBase: new URL("https://www.oyedokun.dev"),
  openGraph: {
    title: "Oyedokun Kehinde — Software Engineer",
    description:
      "Staff-level Software Engineer. Full-stack development, backend architecture, and scalable systems. Turning complex problems into clean, functional code.",
    url: "https://www.oyedokun.dev/",
    siteName: "oyedokun.dev",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.oyedokun.dev/og.png",
        width: 1200,
        height: 630,
        alt: "Oyedokun Kehinde — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oyedokun Kehinde — Software Engineer",
    description:
      "Staff-level Software Engineer. Full-stack development, backend architecture, and scalable systems. Turning complex problems into clean, functional code.",
    images: ["https://www.oyedokun.dev/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--bg)] text-[var(--text-primary)] overflow-x-hidden">
        <ThemeProvider>
          <ResumeModalProvider>
            <WhatsAppChatProvider>
              <Preloader />
              {children}
              <ResumeModal />
              <ScrollToTop />
              <WhatsAppFloat />
            </WhatsAppChatProvider>
          </ResumeModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
