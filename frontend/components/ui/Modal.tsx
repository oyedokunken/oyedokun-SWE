"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error";
  title: string;
  message: string;
}

export default function Modal({ isOpen, onClose, type, title, message }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 shadow-2xl w-full max-w-[420px] pointer-events-auto overflow-y-auto max-h-[90vh] relative">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={16} className="text-[var(--text-secondary)]" />
              </button>

              <div className="flex flex-col items-center text-center gap-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  {type === "success" ? (
                    <CheckCircle size={44} className="text-emerald-400" />
                  ) : (
                    <XCircle size={44} className="text-red-400" />
                  )}
                </motion.div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                    {title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {message}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="btn-primary mt-2 text-xs"
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
