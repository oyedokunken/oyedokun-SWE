import { about, education, experiences, principles, services } from "@/data/content";

// Content for the standalone trust pages (/about, /contact, /privacy). The
// HTML pages and their Markdown representations are both rendered from this,
// so humans and agents always read the same text.

export const SITE_URL = "https://www.oyedokun.dev";

export const contactDetails = {
  email: "oyedokunken@gmail.com",
  phone: "+234 802 813 4942",
  phoneHref: "tel:+2348028134942",
  whatsapp: "https://wa.link/nv875h",
  linkedin: "https://www.linkedin.com/in/oyedokunken/",
  github: "https://github.com/oyedokunken/",
  x: "https://x.com/oyedokunken_",
  location: "Lagos, Nigeria (works remotely worldwide)",
};

export interface InfoLink {
  label: string;
  href: string;
  note?: string;
}

export interface InfoSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  links?: InfoLink[];
}

export interface InfoPage {
  path: "/about/" | "/contact/" | "/privacy/";
  label: string;
  title: string;
  description: string;
  intro: string;
  updated?: string;
  sections: InfoSection[];
}

const aboutPage: InfoPage = {
  path: "/about/",
  label: "About",
  title: "About Oyedokun Kehinde",
  description:
    "Oyedokun Kehinde is a full-stack software engineer in Lagos, Nigeria, focused on backend architecture, distributed systems and SaaS products.",
  intro:
    "I'm Oyedokun Kehinde (oyedokunken), a full-stack software engineer based in Lagos, Nigeria. I design and build backend systems, APIs and full-stack SaaS products, and I take them from architecture through deployment and production support.",
  sections: [
    {
      heading: "How I work",
      paragraphs: [about.intro, about.philosophy],
    },
    {
      heading: "What I build",
      items: services.map((s) => `${s.title}: ${s.desc}`),
    },
    {
      heading: "Experience",
      items: experiences.map(
        (e) => `${e.role}, ${e.company} (${e.type}, ${e.location}), ${e.period}. ${e.highlights[0]}.`
      ),
    },
    {
      heading: "Education and credentials",
      items: education.map(
        (e) => `${e.credential}, ${e.field}: ${e.institution}, ${e.period}${e.meta ? ` (${e.meta})` : ""}.`
      ),
    },
    {
      heading: "Principles",
      items: principles.map((p) => `${p.title}: ${p.desc}`),
    },
    {
      heading: "Availability",
      paragraphs: [
        "I'm open to remote and hybrid software engineering roles, and to freelance and contract work worldwide. The fastest way to start a conversation is the contact page.",
      ],
      links: [
        { label: "Contact", href: "/contact/" },
        { label: "Projects", href: "/#projects" },
        { label: "GitHub", href: contactDetails.github },
      ],
    },
  ],
};

const contactPage: InfoPage = {
  path: "/contact/",
  label: "Contact",
  title: "Contact Oyedokun Kehinde",
  description:
    "Get in touch with Oyedokun Kehinde about software engineering roles, freelance or contract projects, and technical consultation.",
  intro:
    "I'm available for remote and hybrid software engineering roles, freelance and contract projects, and technical consultation on backend architecture and SaaS products. Reach me directly using any of the channels below, or send a message with the form on this page.",
  sections: [
    {
      heading: "Direct channels",
      links: [
        { label: "Email", href: `mailto:${contactDetails.email}`, note: contactDetails.email },
        { label: "Phone", href: contactDetails.phoneHref, note: contactDetails.phone },
        { label: "WhatsApp", href: contactDetails.whatsapp, note: "Chat on WhatsApp" },
        { label: "LinkedIn", href: contactDetails.linkedin, note: "linkedin.com/in/oyedokunken" },
        { label: "GitHub", href: contactDetails.github, note: "github.com/oyedokunken" },
      ],
    },
    {
      heading: "What to include",
      paragraphs: [
        "For roles, share the job description, the team and the working arrangement (remote, hybrid or on-site). For projects, describe what you're building, who it's for, the current state of the codebase, and the timeline you have in mind. The more context you give, the more useful my first reply will be.",
      ],
    },
    {
      heading: "Location",
      paragraphs: [`Based in ${contactDetails.location}.`],
    },
    {
      heading: "Your information",
      paragraphs: [
        "Messages sent through the form are delivered to my email inbox and are only used to reply to you. The privacy policy explains exactly what is collected and how it's handled.",
      ],
      links: [{ label: "Privacy policy", href: "/privacy/" }],
    },
  ],
};

const privacyPage: InfoPage = {
  path: "/privacy/",
  label: "Privacy",
  title: "Privacy Policy",
  description: "How oyedokun.dev collects, uses and stores information from visitors and from the contact form.",
  intro:
    "This policy explains what information oyedokun.dev collects, why, and what happens to it. The site is a personal portfolio run by Oyedokun Kehinde. It has no user accounts, sells nothing, and does not use advertising or tracking cookies.",
  updated: "2026-10-16",
  sections: [
    {
      heading: "Information you send me",
      paragraphs: [
        "The contact form asks for your name, email address, an optional phone number, a subject and a message. It also contains a hidden field that only automated spam bots fill in.",
        "When you submit the form, your message is emailed to me and you receive a short confirmation email. The information is not written to a database. It stays in my email inbox and is used only to reply to you.",
      ],
    },
    {
      heading: "Abuse protection",
      paragraphs: [
        "To stop the form being used to send spam, the form API limits how many requests come from one IP address and how many messages go to one email address within an hour. These counters are kept in server memory only, are not linked to your identity, and are discarded automatically.",
      ],
    },
    {
      heading: "Analytics",
      paragraphs: [
        "The site uses Vercel Web Analytics to count page views. It does not use cookies and does not identify individual visitors; it records aggregated data such as the page visited, the referring site, the country, and the browser and device type.",
      ],
    },
    {
      heading: "Stored in your browser",
      paragraphs: [
        "Your light or dark theme choice is saved in your browser's local storage under the key \"theme\" so the site remembers it on your next visit. It never leaves your device, and you can clear it at any time from your browser settings.",
      ],
    },
    {
      heading: "Third-party services",
      items: [
        "Vercel hosts the website and the form API, and processes requests to deliver the pages.",
        "Google (Gmail SMTP) delivers contact form messages and confirmation emails.",
        "WhatsApp is only involved if you choose to open a WhatsApp chat link; WhatsApp's own privacy policy applies there.",
        "Country flag images in the phone number field load from purecatamphetamine.github.io, and GitHub serves some avatar images. These hosts receive standard request information such as your IP address.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        `You can ask me to delete any message you've sent, or tell you what I hold about you, by emailing ${contactDetails.email}. I'll delete the relevant emails and confirm once it's done.`,
      ],
      links: [{ label: "Contact", href: "/contact/" }],
    },
  ],
};

export const infoPages: InfoPage[] = [aboutPage, contactPage, privacyPage];

export function getInfoPage(path: InfoPage["path"]): InfoPage {
  const page = infoPages.find((p) => p.path === path);
  if (!page) throw new Error(`Unknown info page: ${path}`);
  return page;
}
