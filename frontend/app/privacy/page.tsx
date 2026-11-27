import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PrivacyView from "@/components/pages/PrivacyView";
import { getInfoPage } from "@/data/pages";

const page = getInfoPage("/privacy/");

export const metadata: Metadata = {
  title: `${page.title} | oyedokun.dev`,
  description: page.description,
  alternates: { canonical: page.path },
  openGraph: { title: page.title, description: page.description, url: page.path },
};

export default function Page() {
  return (
    <PageShell current={page.path}>
      <PrivacyView page={page} />
    </PageShell>
  );
}
