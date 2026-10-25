import { getContributions } from "@/lib/github";
import ContributionGraph from "@/components/ui/ContributionGraph";

export default async function GithubActivity() {
  const contributions = await getContributions("last");

  return (
    <section id="activity" className="min-w-0 py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-12">
          <span className="section-label block mb-4">Activity</span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Built in the open.</h2>
          <p className="mt-4 max-w-xl text-sm text-[var(--text-secondary)]">
            Live from my GitHub profile, refreshed every hour.
          </p>
        </div>
        <ContributionGraph initialData={contributions} />
      </div>
    </section>
  );
}
