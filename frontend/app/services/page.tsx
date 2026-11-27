import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ServicesView from "@/components/pages/ServicesView";
import { showcasePages } from "@/data/pages";

const page = showcasePages.services;

export const metadata: Metadata = {
  title: `${page.title} | oyedokun.dev`,
  description: page.description,
  alternates: { canonical: page.path },
  openGraph: { title: page.title, description: page.description, url: page.path },
};

export default function Page() {
  return (
    <PageShell current={page.path}>
      <ServicesView />
    </PageShell>
  );
}
