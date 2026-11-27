import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ContactView from "@/components/pages/ContactView";
import { getInfoPage } from "@/data/pages";

const page = getInfoPage("/contact/");

export const metadata: Metadata = {
  title: `${page.title} | oyedokun.dev`,
  description: page.description,
  alternates: { canonical: page.path },
  openGraph: { title: page.title, description: page.description, url: page.path },
};

export default function Page() {
  return (
    <PageShell current={page.path}>
      <ContactView page={page} />
    </PageShell>
  );
}
