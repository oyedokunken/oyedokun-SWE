"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, FileText, User, Mail, Tag, MessageSquare } from "lucide-react";
import { z } from "zod";
import axios from "axios";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Modal from "@/components/ui/Modal";
import { useResumeModal } from "@/context/ResumeModalContext";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(1, "Phone number is required").refine((v) => isValidPhoneNumber(v), "Enter a valid phone number"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

interface ModalState {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
}

export default function Contact() {
  const { openModal: openResumeModal } = useResumeModal();
  const [form, setForm] = useState<ContactForm>({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
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
      await axios.post(`${API}/api/contact`, parsed.data);
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
                <button
                  onClick={openResumeModal}
                  className="btn-outline flex items-center gap-2"
                >
                  <FileText size={14} />
                Download CV
                </button>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <User size={13} className={iconCls} />
                      <input
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputCls(errors.name, true)}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <Mail size={13} className={iconCls} />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputCls(errors.email, true)}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <PhoneInput
                      international
                      limitMaxLength
                      defaultCountry="NG"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v || "" })}
                      className={`phone-input-wrapper${errors.phone ? " phone-input-error" : ""}`}
                    />
                    {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <Tag size={13} className={iconCls} />
                      <input
                        placeholder="Subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={inputCls(errors.subject, true)}
                      />
                    </div>
                    {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <MessageSquare size={13} className="absolute left-3.5 top-3.5 text-[var(--text-muted)] pointer-events-none" />
                    <textarea
                      placeholder="Tell me about your project or what you need..."
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputCls(errors.message, true)} resize-none`}
                    />
                  </div>
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
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
