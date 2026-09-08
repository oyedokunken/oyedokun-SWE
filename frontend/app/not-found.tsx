import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <span className="section-label">Error 404</span>

        <h1 className="text-[clamp(4rem,12vw,9rem)] font-bold leading-none tracking-[-0.04em]">
          Page not
          <br />
          <span className="text-[var(--text-secondary)]">found.</span>
        </h1>

        <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/#contact" className="btn-outline">
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  );
}
