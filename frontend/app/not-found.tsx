import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <span className="section-label">Error 404</span>

        <h1 className="text-[clamp(3rem,10vw,7rem)] font-bold leading-[1.05] tracking-[-0.04em]">
          This ship drifted
          <br />
          <span className="text-[var(--text-secondary)]">off course.</span>
        </h1>

        <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-md mx-auto">
          The page you are looking for floated off into deep space.
          Let&apos;s navigate you back to base.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/" className="btn-primary">
            Back to Base
          </Link>
          <Link href="/#contact" className="btn-outline">
            Send a Signal
          </Link>
        </div>
      </div>
    </main>
  );
}
