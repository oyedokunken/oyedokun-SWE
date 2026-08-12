"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface WhatsAppChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

const WhatsAppChatContext = createContext<WhatsAppChatContextType>({
  isOpen: false,
  openChat: () => {},
  closeChat: () => {},
});

export function WhatsAppChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WhatsAppChatContext.Provider
      value={{
        isOpen,
        openChat: () => setIsOpen(true),
        closeChat: () => setIsOpen(false),
      }}
    >
      {children}
    </WhatsAppChatContext.Provider>
  );
}

export function useWhatsAppChat() {
  return useContext(WhatsAppChatContext);
}
