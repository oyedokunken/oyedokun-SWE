"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Video, Phone, Lock } from "lucide-react";
import { useWhatsAppChat } from "@/context/WhatsAppChatContext";

function WhatsAppIcon({ size = 22, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function formatDate(d: Date) {
  const date = d.getDate();
  const s = date % 10, r = date % 100;
  const ord = s === 1 && r !== 11 ? "st" : s === 2 && r !== 12 ? "nd" : s === 3 && r !== 13 ? "rd" : "th";
  return `${DAYS[d.getDay()]} ${date}${ord} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function formatTime(d: Date) {
  const h = d.getHours() % 12 || 12;
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${h}:${m} ${d.getHours() >= 12 ? "pm" : "am"}`;
}

function ChatDate() {
  const now = useNow();
  return <>{now ? formatDate(now) : "Today"}</>;
}

function MessageTime() {
  const now = useNow();
  return <>{now ? formatTime(now) : "Now"}</>;
}

export default function WhatsAppFloat() {
  const { isOpen, openChat, closeChat } = useWhatsAppChat();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.4, ease: "backOut" }}
        className="whatsapp-float fixed bottom-8 left-8 z-[60] flex items-center gap-2.5"
      >
        <button
          onClick={openChat}
          aria-label="Chat on WhatsApp"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_32px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_40px_rgba(37,211,102,0.5)] transition-shadow duration-300 flex-shrink-0"
        >
          <WhatsAppIcon size={22} />
        </button>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              onClick={openChat}
              className="bg-[#25D366] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.3)] whitespace-nowrap"
            >
              Let&apos;s chat! 🙂
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="wa-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[61] bg-black/40 backdrop-blur-sm"
              onClick={closeChat}
            />

            <motion.div
              key="wa-modal"
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: "bottom left" }}
              className="fixed bottom-[90px] left-8 z-[62] w-[min(340px,calc(100vw-2rem))] rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
            >
              <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20">
                    <Image
                      src="/shoot/oyedokun-47.jpg"
                      alt="oyedokunken"
                      fill
                      className="object-cover object-center"
                      sizes="40px"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] rounded-full border-2 border-[#075E54] z-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[13px] font-semibold leading-tight truncate">
                    oyedokunken
                  </p>
                  <p className="text-[#B2DFDB] text-[11px] leading-tight mt-0.5">
                    Active Now
                  </p>
                </div>
                <a
                  href="https://wa.link/nv875h"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Video call on WhatsApp"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 flex-shrink-0"
                >
                  <Video size={17} />
                </a>
                <a
                  href="https://wa.link/nv875h"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voice call on WhatsApp"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 flex-shrink-0"
                >
                  <Phone size={15} />
                </a>
                <button
                  onClick={closeChat}
                  aria-label="Close chat"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 flex-shrink-0"
                >
                  <X size={15} />
                </button>
              </div>

              <div
                className="px-4 pt-5 pb-4"
                style={{ background: "#E5DDD5" }}
              >
                <div className="flex justify-center mb-3">
                  <span
                    className="text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-sm"
                    style={{ background: "#E1F2FB", color: "#54656F" }}
                  >
                    <ChatDate />
                  </span>
                </div>

                <div className="flex justify-center mb-4">
                  <p
                    className="text-[11px] leading-snug text-center px-3 py-2.5 rounded-lg shadow-sm max-w-[280px]"
                    style={{ background: "#FDF3C6", color: "#54656F" }}
                  >
                    <Lock size={10} className="inline-block -mt-0.5 mr-1" />
                    Messages you send to this chat and calls are now secured with
                    end-to-end encryption. Tap for more info.
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mb-0.5">
                    <Image
                      src="/shoot/oyedokun-47.jpg"
                      alt="oyedokunken"
                      fill
                      className="object-cover object-center"
                      sizes="28px"
                    />
                  </div>
                  <div
                    className="rounded-xl rounded-bl-none px-3.5 py-2.5 shadow-sm"
                    style={{ background: "#FFFFFF", maxWidth: "calc(100% - 44px)" }}
                  >
                    <p className="text-[13px] leading-snug" style={{ color: "#111B21" }}>
                      Howdy, welcome to my space!
                    </p>
                    <p className="text-[13px] leading-snug mt-3" style={{ color: "#111B21" }}>
                      Are you working on a project or you've got an idea you'd like to discuss?
                    </p>
                    <p className="text-[13px] leading-snug mt-3" style={{ color: "#111B21" }}>
                      Reach out today. Let's build together! 🙂
                    </p>
                    <p className="text-[10px] mt-1.5 text-right" style={{ color: "#667781" }}><MessageTime /></p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.link/nv875h"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] transition-colors duration-200 text-white text-[13px] font-semibold tracking-wide"
              >
                <WhatsAppIcon size={17} />
                Open WhatsApp to chat
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
