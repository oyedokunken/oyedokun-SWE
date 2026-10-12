"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Tag, MessageSquare } from "lucide-react";
import { z } from "zod";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Modal from "@/components/ui/Modal";
import { postJson } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(254, "Email is too long"),
  phone: z.string().min(1, "Phone number is required").refine((v) => isValidPhoneNumber(v), "Enter a valid phone number"),
  subject: z.string().trim().min(3, "Subject is required").max(150, "Subject is too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
});

type ContactForm = z.infer<typeof contactSchema>;

interface ModalState {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [modal, setModal] = useState<ModalState>({ open: false, type: "success", title: "", message: "" });

  const showModal = (type: "success" | "error", title: string, message: string) =>
    setModal({ open: true, type, title, message });

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const errs: typeof errors = {};
      parsed.error.errors.forEach((e) => { if (e.path[0]) errs[e.path[0] as keyof ContactForm] = e.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    try {
      await postJson("/api/contact", { ...parsed.data, website });
      showModal("success", "Message sent.", "I'll get back to you within 24-48 hours. Check your inbox for a confirmation.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      showModal("error", "Something went wrong.", "Could not send your message. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  const inputCls = (err?: string, withIcon = false) =>
    `w-full bg-[var(--bg-elevated)] border ${err ? "border-red-500/60" : "border-[var(--border-color)]"} rounded-lg ${withIcon ? "pl-10" : "pl-4"} pr-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-secondary)] transition-colors`;

  const iconCls = "absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none";

  return (
    <>
      <section id="contact" className="py-28 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 lg:items-stretch">
            <div className="space-y-10">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="section-label block mb-4"
                >
                  Contact
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]"
                >
                  Let&apos;s build
                  <br />
                  something real.
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-[var(--text-secondary)] leading-relaxed"
              >
                Open to contracts, full-time roles, and interesting projects. If you have a problem worth solving, reach out.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
              >
                <a
                  href="https://wa.link/nv875h"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2"
                >
                  Hire Me
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="h-full"
            >
              <form onSubmit={handleContact} className="space-y-4 h-full flex flex-col">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <User size={13} className={iconCls} />
                      <input
                        placeholder="Your name"
                        aria-label="Your name"
                        autoComplete="name"
                        maxLength={100}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputCls(errors.name, true)}
                      />
                    </div>
                    {errors.name && <p role="alert" className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <Mail size={13} className={iconCls} />
                      <input
                        type="email"
                        placeholder="Email address"
                        aria-label="Email address"
                        autoComplete="email"
                        maxLength={254}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputCls(errors.email, true)}
                      />
                    </div>
                    {errors.email && <p role="alert" className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <PhoneInput
                      international
                      limitMaxLength
                      defaultCountry="NG"
                      placeholder="Phone number"
                      aria-label="Phone number"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v || "" })}
                      className={`phone-input-wrapper${errors.phone ? " phone-input-error" : ""}`}
                    />
                    {errors.phone && <p role="alert" className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <Tag size={13} className={iconCls} />
                      <input
                        placeholder="Subject"
                        aria-label="Subject"
                        maxLength={150}
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={inputCls(errors.subject, true)}
                      />
                    </div>
                    {errors.subject && <p role="alert" className="text-xs text-red-400 mt-1">{errors.subject}</p>}
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <MessageSquare size={13} className="absolute left-3.5 top-3.5 text-[var(--text-muted)] pointer-events-none" />
                    <textarea
                      placeholder="Tell me about your project or what you need..."
                      aria-label="Message"
                      maxLength={5000}
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputCls(errors.message, true)} resize-none`}
                    />
                  </div>
                  {errors.message && <p role="alert" className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>
                <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60 mt-auto">
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={13} />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </>
  );
}
