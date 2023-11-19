"use client";
import { useEffect } from "react";
import ChatMessagePanel from "./ChatMessagePanel";
import { useChatStore } from "../stores";

export default function Chat() {
  const clearChatMessages = useChatStore((state) => state.clearChatMessages);

  useEffect(() => {
    clearChatMessages();
  }, []);

  return <ChatMessagePanel />;
}
