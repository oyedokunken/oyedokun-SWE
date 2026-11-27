import Link from "next/link";
import Logo from "@/components/Logo";
import Footer from "@/components/layout/Footer";
import ThemeToggle from "@/components/ui/ThemeToggle";
import PageMenu from "@/components/PageMenu";
import { siteNav } from "@/data/pages";

// Header and footer for the standalone showcase pages (/about, /projects,
// /services). The page body is passed in as children.
export default function PageShell({ current, children }: { current: string; children: React.ReactNode }) {
  const link = (active: boolean) =>
    `px-3 py-2 text-sm rounded-full transition-colors whitespace-nowrap ${
      active ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
    }`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[70] bg-[var(--bg)] border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" aria-label="oyedokun.dev, home">
            <Logo />
          </Link>
          <nav aria-label="Pages" className="flex items-center gap-1">
            {siteNav.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                aria-current={p.href === current ? "page" : undefined}
                className={`hidden sm:inline-block ${link(p.href === current)}`}
              >
                {p.label}
              </Link>
            ))}
            <span className="ml-2 hidden sm:inline-block">
              <ThemeToggle />
            </span>
            <PageMenu current={current} />
          </nav>
        </div>
      </header>
      <main className="page-shell relative">{children}</main>
      <Footer />
    </>
  );
}
