"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { contactDetails } from "@/data/pages";
import { screens } from "@/data/screens";
import { useHydrated } from "@/lib/useHydrated";

const NEW_MS = 30 * 24 * 60 * 60 * 1000;
const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
const isNew = (addedOn?: string) => !!addedOn && Date.now() - new Date(addedOn).getTime() < NEW_MS;
const pad = (n: number) => String(n).padStart(2, "0");

type View = { src: string; kind: "shot" | "cover"; label: string };

// Screenshots first, then the logo cover.
function viewsFor(project: Project): View[] {
  const shots = (screens[project.id] ?? []).map((shot): View => ({ src: shot.src, kind: "shot", label: shot.label }));
  return [...shots, { src: project.cover, kind: "cover", label: "Logo" }];
}

function hostOf(project: Project) {
  try {
    return new URL(project.live ?? project.github ?? "").hostname.replace(/^www\./, "");
  } catch {
    return project.title.toLowerCase();
  }
}

function NewBadge() {
  return (
    <span className="text-[9px] tracking-[1.5px] uppercase font-bold px-2.5 py-1 rounded-full bg-red-600 text-white dark:bg-white dark:text-black">
      New
    </span>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <li
          key={t}
          className="text-[10px] tracking-[1.5px] uppercase px-3 py-1.5 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)]"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function Links({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5 !px-5 !text-[11px]">
          Visit site <ArrowUpRight size={14} />
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline !py-2.5 !px-5 !text-[11px] !border-[var(--border-color)]"
        >
          <Github size={14} /> Source
        </a>
      )}
    </div>
  );
}

const LIGHTS = [
  { color: "#ff5f57", label: "Close" },
  { color: "#febc2e", label: "Minimise" },
  { color: "#28c840", label: "Full view" },
];

// A Mac-style window around each image. Every image is shown whole: screenshots match
// the frame ratio of 16:10 and the logo cover is contained on a white card.
// Red closes the viewer, green opens it full screen; yellow is decoration.
function Frame({
  project,
  view,
  onOpen,
  onClose,
  sizes = "(max-width: 1024px) 100vw, 640px",
}: {
  project: Project;
  view: View;
  onOpen?: () => void;
  onClose?: () => void;
  sizes?: string;
}) {
  const actions = [onClose, undefined, onOpen];
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-elevated)] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-[var(--border-color)] bg-[var(--bg-elevated)] px-4 py-2.5">
        <span className="flex gap-2">
          {LIGHTS.map((l, n) => {
            const action = actions[n];
            const dot = <i className="block h-3 w-3 rounded-full" style={{ background: l.color }} />;
            return action ? (
              <button key={l.label} type="button" onClick={action} aria-label={l.label} className="rounded-full p-0.5">
                {dot}
              </button>
            ) : (
              <span key={l.label} aria-hidden="true" className="p-0.5">
                {dot}
              </span>
            );
          })}
        </span>
        <span className="ml-3 flex-1 truncate rounded-md bg-[var(--bg)] px-3 py-1 text-[11px] text-[var(--text-muted)]">
          {hostOf(project)}
        </span>
      </div>
      <div className={`relative aspect-[16/10] ${view.kind === "cover" ? "bg-white" : "bg-[var(--bg)]"}`}>
        <motion.div
          key={view.src}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <Image
            src={view.src}
            alt={`${project.title} ${view.label.toLowerCase()}`}
            fill
            sizes={sizes}
            className={view.kind === "cover" ? "object-contain p-8" : "object-cover object-top"}
          />
        </motion.div>
        {onOpen && (
          <button
            type="button"
            onClick={onOpen}
            aria-label={`View ${project.title} ${view.label.toLowerCase()} full screen`}
            className="absolute inset-0 cursor-zoom-in"
          />
        )}
      </div>
    </div>
  );
}

function Thumbs({ views, index, onSelect, title }: { views: View[]; index: number; onSelect: (n: number) => void; title: string }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {views.map((v, n) => (
        <button
          key={v.src}
          type="button"
          onClick={() => onSelect(n)}
          aria-label={`Show ${v.label.toLowerCase()} of ${title}`}
          aria-pressed={n === index}
          className={`relative h-12 w-[4.5rem] shrink-0 overflow-hidden rounded-lg border transition-all ${
            n === index ? "border-[var(--text-primary)]" : "border-[var(--border-color)] opacity-60 hover:opacity-100"
          } ${v.kind === "cover" ? "bg-white" : "bg-[var(--bg)]"}`}
        >
          <Image
            src={v.src}
            alt=""
            fill
            sizes="72px"
            className={v.kind === "cover" ? "object-contain p-1.5" : "object-cover object-top"}
          />
        </button>
      ))}
    </div>
  );
}

// Full-screen viewer: arrows or the keyboard step through every image of the project.
function Lightbox({
  project,
  views,
  index,
  setIndex,
  onClose,
}: {
  project: Project;
  views: View[];
  index: number;
  setIndex: (n: number) => void;
  onClose: () => void;
}) {
  const go = (d: number) => setIndex((index + d + views.length) % views.length);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((index + 1) % views.length);
      if (e.key === "ArrowLeft") setIndex((index - 1 + views.length) % views.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, views.length, onClose, setIndex]);

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-white hover:text-black";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} screenshots`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 sm:p-8"
    >
      <div
        className="w-full space-y-4"
        style={{ maxWidth: "max(20rem, min(75rem, calc((100vh - 13rem) * 1.6)))" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Frame project={project} view={views[index]} onClose={onClose} sizes="1200px" />
        <div className="flex items-center justify-between gap-3 text-white">
          <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={arrow}>
            <ChevronLeft size={20} />
          </button>
          <p className="text-center text-xs tracking-[2px] uppercase text-white/70">
            {project.title} · {views[index].label} · {index + 1} / {views.length}
          </p>
          <button type="button" onClick={() => go(1)} aria-label="Next image" className={arrow}>
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex justify-center">
          <Thumbs views={views} index={index} onSelect={setIndex} title={project.title} />
        </div>
      </div>
    </motion.div>
  );
}

// One project gallery: the window, clickable thumbnails that swap the window, and the viewer.
function Gallery({ project, counter }: { project: Project; counter?: string }) {
  const views = viewsFor(project);
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const mounted = useHydrated();
  const view = views[Math.min(i, views.length - 1)];

  return (
    <div className="space-y-4">
      <Frame project={project} view={view} onOpen={() => setOpen(true)} />
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Thumbs views={views} index={i} onSelect={setI} title={project.title} />
        </div>
        {counter && <p className="shrink-0 text-[11px] tracking-[3px] text-[var(--text-muted)]">{counter}</p>}
      </div>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && <Lightbox project={project} views={views} index={i} setIndex={setI} onClose={() => setOpen(false)} />}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

// The pinned side: shows the gallery of the active project.
function Stage({ project, index, total }: { project: Project; index: number; total: number }) {
  return (
    <div style={{ maxWidth: "max(22rem, calc((100vh - 15rem) * 1.6))" }}>
      <Gallery project={project} counter={`${pad(index + 1)} / ${pad(total)}`} />
    </div>
  );
}

// Phones have no pinned side, so each project carries its own gallery.
function InlineVisuals({ project }: { project: Project }) {
  return (
    <div className="lg:hidden">
      <Gallery project={project} />
    </div>
  );
}

// Slow strip of every cover, a quick visual taste of the whole body of work.
function CoverStrip() {
  const items = [...projects, ...projects, ...projects];
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div className="flex gap-4 w-max" style={{ animation: "marquee-scroll 90s linear infinite" }}>
        {items.map((p, i) => (
          <div key={i} className="relative h-40 w-64 shrink-0 overflow-hidden rounded-xl border border-[var(--border-color)] bg-white">
            <Image src={p.cover} alt="" fill sizes="256px" className="object-contain p-4 grayscale opacity-70" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsView() {
  const [filter, setFilter] = useState("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const activeIndex = Math.max(0, list.findIndex((p) => p.id === activeId));
  const active = list[activeIndex];
  const stats = [
    [String(projects.length), "Projects"],
    [String(categories.length - 1), "Categories"],
    [String(new Set(projects.flatMap((p) => p.tags)).size), "Technologies"],
  ];

  // Scroll drives the fixed side: whichever project crosses the middle of the screen becomes active.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId((e.target as HTMLElement).dataset.id ?? null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [list]);

  return (
    <>
      <section className="relative grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-14">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="section-label block mb-6">
            Projects
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          >
            Everything
            <br />
            <span className="text-[var(--text-muted)]">I&apos;ve shipped.</span>
          </motion.h1>
          <div className="mt-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="max-w-xl text-lg text-[var(--text-secondary)] leading-relaxed"
            >
              Platforms, SaaS products, real-time systems and tools, built for real users in production. Keep scrolling and the
              preview follows you, one project at a time.
            </motion.p>
            <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-12">
              {stats.map(([n, l]) => (
                <div key={l} className="flex flex-col-reverse">
                  <dt className="text-[10px] tracking-[3px] uppercase text-[var(--text-muted)]">{l}</dt>
                  <dd className="text-5xl font-bold tracking-tight">{n}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
        <div className="relative z-10 pb-16">
          <CoverStrip />
        </div>
      </section>

      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setActiveId(null);
                }}
                aria-pressed={filter === cat}
                className={`text-[11px] tracking-[1px] uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                  filter === cat
                    ? "bg-[var(--text-primary)] text-[var(--bg)] border-[var(--text-primary)]"
                    : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-x-16">
            <aside className="hidden lg:block" aria-live="polite">
              <div className="sticky top-28 pt-6">
                {active && <Stage key={active.id} project={active} index={activeIndex} total={list.length} />}
              </div>
            </aside>

            <ol>
              <AnimatePresence initial={false}>
                {list.map((p, i) => {
                  const on = active?.id === p.id;
                  return (
                    <motion.li
                      key={p.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      data-id={p.id}
                      ref={(el) => {
                        if (el) itemRefs.current.set(p.id, el);
                        else itemRefs.current.delete(p.id);
                      }}
                      onClick={() => setActiveId(p.id)}
                      className="border-t border-[var(--border-color)] last:border-b py-10 lg:min-h-[62vh] lg:flex lg:flex-col lg:justify-center"
                    >
                      <div className={`space-y-6 transition-opacity duration-500 ${on ? "lg:opacity-100" : "lg:opacity-30"}`}>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] tracking-[3px] text-[var(--text-muted)]">
                            {pad(i + 1)} / {pad(list.length)}
                          </span>
                          <span className="section-label">{p.category}</span>
                          {isNew(p.addedOn) && <NewBadge />}
                        </div>
                        <h2 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02]">{p.title}</h2>
                        <InlineVisuals project={p} />
                        <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{p.desc}</p>
                        <Tags tags={p.tags} />
                        <Links project={p} />
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ol>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-28 text-center space-y-8">
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05]">Have something to build?</h2>
        <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
          Tell me what you have in mind and I&apos;ll tell you how I would approach it.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={contactDetails.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Start a conversation
          </a>
          <a href={contactDetails.upwork} target="_blank" rel="noopener noreferrer" className="btn-outline">
            Hire me on Upwork
          </a>
        </div>
      </section>
    </>
  );
}
