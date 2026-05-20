"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Bot,
  Database,
  FileUp,
  Leaf,
  Loader2,
  Send,
  Sparkles,
  Utensils,
  Wand2,
} from "lucide-react";
import { farmImages, quickPrompts } from "@/lib/viegardenData";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Knowledge = {
  content: string;
  updatedAt: string | null;
};

const capabilities = [
  { icon: Utensils, title: "Gợi ý combo", text: "Kết hợp rau củ quả thành set dễ mua, dễ nấu." },
  { icon: Wand2, title: "Cách chế biến", text: "Sơ chế, bảo quản và nấu nhanh cho bữa gia đình." },
  { icon: Leaf, title: "Thành phần cơ bản", text: "Nêu vitamin, khoáng chất, chất xơ ở mức tham khảo." },
  { icon: Sparkles, title: "Nội dung bán hàng", text: "Viết mô tả sản phẩm ngắn, rõ nguồn gốc." },
];

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Xin chào, tôi là VieGarden AI. Bạn có thể hỏi về combo rau củ, cách chế biến, bảo quản, thành phần cơ bản như vitamin/chất xơ hoặc thông tin lô hàng đã được farm upload.",
  },
];

function cleanMarkdownText(text: string) {
  return text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function MessageContent({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <span className="whitespace-pre-wrap">{content}</span>;
  }

  const lines = cleanMarkdownText(content).split("\n");
  const blocks: JSX.Element[] = [];
  let bullets: string[] = [];
  let paragraph: string[] = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    blocks.push(
      <p key={`p-${blocks.length}`} className="leading-7">
        {paragraph.join(" ")}
      </p>,
    );
    paragraph = [];
  }

  function flushBullets() {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="list-disc space-y-1 pl-5 leading-7">
        {bullets.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>,
    );
    bullets = [];
  }

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushBullets();
      return;
    }

    const bulletMatch = trimmed.match(/^[-*•]\s+(.+)$/);
    const numberedMatch = trimmed.match(/^\d+[.)]\s+(.+)$/);

    if (bulletMatch || numberedMatch) {
      flushParagraph();
      bullets.push(bulletMatch?.[1] || numberedMatch?.[1] || trimmed);
      return;
    }

    flushBullets();
    paragraph.push(trimmed);
  });

  flushParagraph();
  flushBullets();

  return <div className="space-y-3">{blocks.length ? blocks : content}</div>;
}

export function AIAssistantClient() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [knowledge, setKnowledge] = useState<Knowledge | null>(null);
  const [knowledgeDraft, setKnowledgeDraft] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isKnowledgeSaving, setIsKnowledgeSaving] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const canManageKnowledge = useMemo(() => {
    const role = session?.user?.role;
    return role === "ADMIN" || role === "FARMER";
  }, [session]);

  useEffect(() => {
    async function loadKnowledge() {
      const response = await fetch("/api/ai/knowledge");
      const data = (await response.json()) as Knowledge;
      setKnowledge(data);
      setKnowledgeDraft(data.content);
    }

    loadKnowledge().catch(() => {
      setError("Không đọc được dữ liệu farm hiện tại.");
    });
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isChatLoading]);

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || isChatLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsChatLoading(true);

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

      if (!answer.trim()) {
        setMessages((current) =>
          current.map((message, index) =>
            index === assistantIndex
              ? { ...message, content: "Tôi chưa tạo được phản hồi. Bạn thử hỏi lại ngắn hơn nhé." }
              : message,
          ),
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Không thể gọi AI Assistant.";
      setError(message);
      setMessages((current) => [...current, { role: "assistant", content: message }]);
    } finally {
      setIsChatLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendMessage(input);
  }

  async function handleKnowledgeSave() {
    setError("");
    setIsKnowledgeSaving(true);

    try {
      const response = await fetch("/api/ai/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: knowledgeDraft }),
      });
      const data = (await response.json()) as Knowledge & { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Không lưu được dữ liệu farm.");
      }

      setKnowledge(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không lưu được dữ liệu farm.");
    } finally {
      setIsKnowledgeSaving(false);
    }
  }

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const content = await file.text();
    setKnowledgeDraft(content);
  }

  return (
    <main className="min-h-screen bg-background pb-16">
      <section className="container-page pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            <Bot className="h-4 w-4" />
            VieGarden AI Assistant
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
            Trợ lý AI gợi ý combo và cách chế biến nông sản
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Dữ liệu rau củ quả được upload vào knowledge base. AI dùng dữ liệu này để gợi ý combo, cách chế biến, bảo quản và thành phần cơ bản, không tư vấn dinh dưỡng chuyên sâu.
          </p>
        </div>
      </section>

      <section className="container-page mt-12 grid gap-8 lg:grid-cols-12">
        <aside className="space-y-6 lg:col-span-3">
          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-extrabold text-primary">AI Capabilities</h2>
            <div className="space-y-5">
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <img src={farmImages.produce} alt="Nông sản tươi VieGarden" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/65 to-transparent p-6 text-white">
              <p className="font-bold">Farm to Table</p>
              <p className="text-sm text-white/80">Gợi ý combo và món ăn từ dữ liệu farm.</p>
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-primary">
              <Database className="h-5 w-5" />
              <h2 className="font-extrabold">Farm Data</h2>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              {knowledge?.updatedAt
                ? `Cập nhật lần cuối: ${new Date(knowledge.updatedAt).toLocaleString("vi-VN")}`
                : "Đang dùng dữ liệu mẫu ban đầu."}
            </p>
          </div>
        </aside>

        <section className="space-y-8 lg:col-span-9">
          {canManageKnowledge && (
            <div className="rounded-[2rem] border bg-card p-6 shadow-sm">
              <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-primary">Upload dữ liệu rau củ quả</h2>
                  <p className="text-sm text-muted-foreground">
                    Dán text, JSON, CSV hoặc upload file `.txt/.json/.csv`. Ưu tiên tên rau củ, tồn kho, ngày thu hoạch, cách bảo quản, cách chế biến, vitamin/chất xơ cơ bản.
                  </p>
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-semibold text-primary">
                  <FileUp className="h-4 w-4" />
                  Chọn file
                  <input className="hidden" type="file" accept=".txt,.json,.csv,.md" onChange={handleFileUpload} />
                </label>
              </div>
              <textarea
                value={knowledgeDraft}
                onChange={(event) => setKnowledgeDraft(event.target.value)}
                className="min-h-[220px] w-full rounded-2xl border bg-background p-4 text-sm leading-6 outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ví dụ: Rau muống lô RM202604001, tồn kho 30kg, thu hoạch 26/04, hợp xào tỏi/nấu canh, bảo quản 2-4 độ C, có chất xơ và vitamin A/C ở mức tham khảo..."
              />
              <div className="mt-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <p className="text-xs text-muted-foreground">
                  Mẹo: dữ liệu càng rõ theo từng loại rau, combo, cách chế biến và tồn kho thì AI phản hồi càng nhanh và sát ý khách.
                </p>
                <button
                  onClick={handleKnowledgeSave}
                  disabled={isKnowledgeSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                >
                  {isKnowledgeSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                  Lưu dữ liệu farm
                </button>
              </div>
            </div>
          )}

          <div className="flex h-[720px] flex-col overflow-hidden rounded-[2rem] border bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b bg-white p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-extrabold">VieGarden Assistant</p>
                  <p className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    OpenRouter | gpt-oss-120b:free
                  </p>
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>

            <div ref={listRef} className="flex-1 space-y-7 overflow-y-auto bg-secondary/30 p-6 md:p-8">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[90%] rounded-3xl px-5 py-4 shadow-sm ${
                      message.role === "user"
                        ? "rounded-tr-sm bg-primary text-white"
                        : "rounded-tl-sm bg-white text-foreground"
                    }`}
                  >
                    <MessageContent content={message.content} isUser={message.role === "user"} />
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex items-start">
                  <div className="inline-flex items-center gap-2 rounded-3xl rounded-tl-sm bg-white px-5 py-4 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    Đang trả lời...
                  </div>
                </div>
              )}
            </div>

            <div className="border-t bg-white p-6">
              <div className="mb-4 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border bg-background px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="relative">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="w-full rounded-2xl border bg-background px-5 py-4 pr-14 outline-none transition focus:ring-2 focus:ring-primary"
                  placeholder="Gửi câu hỏi của bạn..."
                  type="text"
                />
                <button
                  disabled={isChatLoading}
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-xl bg-primary p-2 text-primary-foreground disabled:opacity-60"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
              {error && <p className="mt-3 text-sm font-semibold text-destructive">{error}</p>}
            </div>
          </div>

          <p className="mx-auto max-w-2xl text-center text-xs italic text-muted-foreground">
            VieGarden AI chỉ gợi ý combo, chế biến, bảo quản và thành phần cơ bản như vitamin/chất xơ. AI không tư vấn dinh dưỡng chuyên sâu hoặc vấn đề y khoa.
          </p>
        </section>
      </section>
    </main>
  );
}
