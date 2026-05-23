import { NextResponse } from "next/server";
import { getFarmKnowledge } from "@/lib/farmKnowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const model = process.env.OPENROUTER_MODEL || "openai/gpt-oss-120b:free";
const maxKnowledgeChars = 6000;

function compactKnowledge(content: string) {
  const normalized = content.replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  return normalized.length > maxKnowledgeChars
    ? `${normalized.slice(0, maxKnowledgeChars)}\n\n[ÄÃ£ rÃºt gá»n dá»¯ liá»‡u upload vÃ¬ quÃ¡ dÃ i.]`
    : normalized;
}

function streamHeaders() {
  return {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    "X-Accel-Buffering": "no",
  };
}

function errorStream(message: string, status = 500) {
  return new Response(message, {
    status,
    headers: streamHeaders(),
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "AI Assistant chÆ°a Ä‘Æ°á»£c cáº¥u hÃ¬nh API key trÃªn server." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    const incomingMessages = body.messages?.filter((message) => message.role !== "system") || [];

    if (!incomingMessages.length) {
      return NextResponse.json({ error: "Tin nháº¯n khÃ´ng Ä‘Æ°á»£c Ä‘á»ƒ trá»‘ng." }, { status: 400 });
    }

    const knowledge = await getFarmKnowledge();
    const latestMessages = incomingMessages.slice(-3);

    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
        "X-Title": "VieGarden AI Assistant",
      },
      body: JSON.stringify({
        model,
        stream: true,
        temperature: 0.2,
        max_tokens: 320,
        messages: [
          {
            role: "system",
            content: [
              "Báº¡n lÃ  VieGarden AI Assistant, chatbot há»— trá»£ khÃ¡ch hÃ ng vá» nÃ´ng sáº£n sáº¡ch cá»§a Farm Together.",
              "Pháº¡m vi tráº£ lá»i: gá»£i Ã½ combo rau cá»§ quáº£, cÃ¡ch sÆ¡ cháº¿/cháº¿ biáº¿n, báº£o quáº£n, gá»£i Ã½ mÃ³n Äƒn, vÃ  thÃ nh pháº§n cÆ¡ báº£n nhÆ° vitamin, khoÃ¡ng cháº¥t, cháº¥t xÆ¡.",
              "KhÃ´ng tÆ° váº¥n dinh dÆ°á»¡ng chuyÃªn sÃ¢u, khÃ´ng láº­p thá»±c Ä‘Æ¡n Ä‘iá»u trá»‹, khÃ´ng nÃ³i sáº£n pháº©m chá»¯a bá»‡nh, khÃ´ng thay tháº¿ bÃ¡c sÄ©/chuyÃªn gia dinh dÆ°á»¡ng.",
              "Khi khÃ¡ch há»i vá» farm, tá»“n kho, chá»©ng nháº­n, ngÃ y thu hoáº¡ch hoáº·c cÃ¡ch canh tÃ¡c, chá»‰ dÃ¹ng FARM DATA bÃªn dÆ°á»›i. Náº¿u khÃ´ng cÃ³ thÃ´ng tin, nÃ³i rÃµ VieGarden chÆ°a upload thÃ´ng tin Ä‘Ã³.",
              "Tráº£ lá»i báº±ng tiáº¿ng Viá»‡t, ngáº¯n gá»n, thÃ¢n thiá»‡n. KhÃ´ng dÃ¹ng Markdown thÃ´ nhÆ° dáº¥u *, **, ###. Náº¿u cáº§n liá»‡t kÃª, viáº¿t má»—i Ã½ trÃªn má»™t dÃ²ng báº¯t Ä‘áº§u báº±ng dáº¥u gáº¡ch ngang '-'.",
              "",
              "FARM DATA:",
              compactKnowledge(knowledge.content),
            ].join("\n"),
          },
          ...latestMessages,
        ],
      }),
    });

    if (!openRouterResponse.ok || !openRouterResponse.body) {
      const result = await openRouterResponse.json().catch(() => null);
      return NextResponse.json(
        { error: result?.error?.message || "AI Assistant chÆ°a táº¡o Ä‘Æ°á»£c pháº£n há»“i." },
        { status: openRouterResponse.status },
      );
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const reader = openRouterResponse.body.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        let isClosed = false;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data:")) continue;

              const payload = trimmed.slice(5).trim();
              if (payload === "[DONE]") {
                isClosed = true;
                controller.close();
                return;
              }

              try {
                const parsed = JSON.parse(payload);
                const token = parsed?.choices?.[0]?.delta?.content || "";
                if (token) {
                  controller.enqueue(encoder.encode(token));
                }
              } catch {
                // Ignore provider heartbeat chunks.
              }
            }
          }
        } catch (error) {
          controller.enqueue(
            encoder.encode(error instanceof Error ? `\n${error.message}` : "\nKhÃ´ng thá»ƒ Ä‘á»c pháº£n há»“i AI."),
          );
        } finally {
          if (!isClosed) {
            controller.close();
          }
        }
      },
    });

    return new Response(stream, {
      headers: streamHeaders(),
    });
  } catch (error) {
    return errorStream(error instanceof Error ? error.message : "KhÃ´ng thá»ƒ káº¿t ná»‘i AI Assistant.");
  }
}


