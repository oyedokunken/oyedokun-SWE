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
  title: "Oyedokun Kehinde - Staff-level Software Engineer and CTO",
  description:
    "Software Engineer. Full-stack focus, SaaS products, distributed systems, MERN and PERN stacks. Architecting systems. Shipping at scale.",
  keywords: [
    "Oyedokun Kehinde",
    "oyedokunken",
    "oyedokun.dev",
    "Software Engineer Nigeria",
    "Full Stack Developer Nigeria",
    "Backend Engineer",
    "Backend Developer",
    "Full Stack Engineer",
    "Software Engineer Portfolio",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "React Developer",
    "API Development",
    "SaaS Developer",
    "Fintech Developer",
    "Systems Engineer",
    "Software Architect",
    "Freelance Software Engineer",
    "Remote Software Engineer",
    "Lagos Developer",
    "Nigeria Tech",
    "PostgreSQL",
    "Prisma",
    "Express.js",
    "Software Engineer for hire",
    "hire software engineer",
    "web developer Nigeria",
  ],
  authors: [{ name: "Oyedokun Kehinde" }],
  creator: "Oyedokun Kehinde",
  metadataBase: new URL("https://www.oyedokun.dev"),
  openGraph: {
    title: "Oyedokun Kehinde - Staff-level Software Engineer and CTO",
    description:
      "Software Engineer. Full-stack focus, SaaS products, distributed systems, MERN and PERN stacks. Architecting systems. Shipping at scale.",
    url: "https://www.oyedokun.dev/",
    siteName: "oyedokun.dev",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.oyedokun.dev/og.png",
        width: 1200,
        height: 630,
        alt: "Oyedokun Kehinde - Staff-level Software Engineer and CTO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oyedokun Kehinde - Staff-level Software Engineer and CTO",
    description:
      "Software Engineer. Full-stack focus, SaaS products, distributed systems, MERN and PERN stacks. Architecting systems. Shipping at scale.",
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
