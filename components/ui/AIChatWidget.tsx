"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { quickPrompts } from "@/lib/viegardenData";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content: "Xin chào! Tôi có thể gợi ý combo rau củ, cách chế biến hoặc bảo quản nông sản VieGarden.",
  },
];

function cleanText(text: string) {
  return text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function BubbleContent({ content }: { content: string }) {
  return <span className="whitespace-pre-wrap">{cleanText(content)}</span>;
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "AI chưa phản hồi được.");
      }

      if (!response.body) {
        throw new Error("AI chưa trả stream phản hồi.");
      }

      const assistantIndex = nextMessages.length;
      setMessages((current) => [...current, { role: "assistant", content: "" }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        answer += decoder.decode(value, { stream: true });
        setMessages((current) =>
          current.map((message, index) =>
            index === assistantIndex ? { ...message, content: answer } : message,
          ),
        );
      }
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: error instanceof Error ? error.message : "Không thể gọi VieGarden AI.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="fixed bottom-6 right-6 z-[120] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-3xl border bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="font-extrabold">VieGarden AI</p>
                <p className="text-xs text-white/75">Trợ lý combo & chế biến</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Đóng chat AI" className="rounded-full p-2 hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={listRef} className="h-80 space-y-3 overflow-y-auto bg-secondary/30 p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-tr-sm bg-primary text-white"
                      : "rounded-tl-sm bg-white text-foreground shadow-sm"
                  }`}
                >
                  <BubbleContent content={message.content} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                Đang trả lời...
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {quickPrompts.slice(0, 3).map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="shrink-0 rounded-full border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-primary"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 rounded-2xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                placeholder="Hỏi VieGarden AI..."
              />
              <button
                disabled={isLoading}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground disabled:opacity-60"
                aria-label="Gửi câu hỏi"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((value) => !value)}
        aria-label="Mở VieGarden AI"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform hover:scale-105"
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </button>
    </div>
  );
}
