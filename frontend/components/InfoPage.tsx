import Link from "next/link";
import Logo from "@/components/Logo";
import Footer from "@/components/layout/Footer";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { infoPages, type InfoPage as InfoPageData } from "@/data/pages";

// Shared layout for the standalone trust pages (/about, /contact, /privacy).
// Server-rendered from data/pages.ts so the full text is in the raw HTML.
export default function InfoPage({ page, children }: { page: InfoPageData; children?: React.ReactNode }) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[70] bg-[var(--bg)] border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" aria-label="oyedokun.dev, home">
            <Logo />
          </Link>
          <nav aria-label="Pages" className="flex items-center gap-1">
            {infoPages.map((p) => (
              <Link
                key={p.path}
                href={p.path}
                aria-current={p.path === page.path ? "page" : undefined}
                className={`hidden sm:inline-block px-3 py-2 text-sm rounded-full transition-colors ${
                  p.path === page.path
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {p.label}
              </Link>
            ))}
            <span className="ml-2">
              <ThemeToggle />
            </span>
          </nav>
        </div>
      </header>

      <main className="relative grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] pointer-events-none" />
        <article className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 pt-36 pb-20 space-y-12">
          <header className="space-y-6">
            <span className="section-label">{page.label}</span>
            <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em]">{page.title}</h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{page.intro}</p>
            {page.updated && (
              <p className="text-xs tracking-[2px] uppercase text-[var(--text-muted)]">
                Last updated <time dateTime={page.updated}>{page.updated}</time>
              </p>
            )}
          </header>

          {page.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p} className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                  {p}
                </p>
              ))}
              {section.items && (
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="glass rounded-xl px-4 py-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.links && (
                <ul className="flex flex-wrap gap-3">
                  {section.links.map((l) => {
                    const external = l.href.startsWith("http");
                    return (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="btn-outline"
                        >
                          {l.label}
                          {l.note && <span className="text-[var(--text-muted)]">{l.note}</span>}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          ))}
        </article>
        {children}
      </main>
      <Footer />
    </>
  );
}
