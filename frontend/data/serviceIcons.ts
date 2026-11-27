import { Layers, Server, Code2, Network, Cpu, ShieldCheck, Plug, Package, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Icons and colours per item; the text lives in data/content.ts.
export const presentation: Record<string, { icon: LucideIcon; bg: string; accent: string }> = {
  "01": { icon: Layers, bg: "#0f0f0f", accent: "#1a1a2e" },
  "02": { icon: Package, bg: "#0f0f0f", accent: "#1c1a0f" },
  "03": { icon: Cpu, bg: "#0f0f0f", accent: "#0f1a0f" },
  "04": { icon: MessageSquare, bg: "#0f0f0f", accent: "#0f0f1a" },
  "05": { icon: Server, bg: "#0f0f0f", accent: "#0d1a1a" },
  "06": { icon: Code2, bg: "#0f0f0f", accent: "#1a100f" },
  "07": { icon: Network, bg: "#0f0f0f", accent: "#1a1a0d" },
  "08": { icon: Plug, bg: "#0f0f0f", accent: "#1a0f0f" },
  "09": { icon: ShieldCheck, bg: "#0f0f0f", accent: "#1a1a1a" },
};
