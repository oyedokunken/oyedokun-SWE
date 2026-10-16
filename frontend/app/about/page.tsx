import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

import { getInfoPage } from "@/data/pages";

const page = getInfoPage("/about/");

export const metadata: Metadata = {
  title: `${page.title} | oyedokun.dev`,
  description: page.description,
  alternates: { canonical: page.path },
  openGraph: { title: page.title, description: page.description, url: page.path },
};

export default function Page() {
  return <InfoPage page={page} />;
}
