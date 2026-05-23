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
    ? `${normalized.slice(0, maxKnowledgeChars)}\n\n[Đã rút gọn dữ liệu upload vì quá dài.]`
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
      { error: "AI Assistant chưa được cấu hình API key trên server." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    const incomingMessages = body.messages?.filter((message) => message.role !== "system") || [];

    if (!incomingMessages.length) {
      return NextResponse.json({ error: "Tin nhắn không được để trống." }, { status: 400 });
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
              "Bạn là VieGarden AI Assistant, chatbot hỗ trợ khách hàng về nông sản sạch của Farm Together.",
              "Phạm vi trả lời: gợi ý combo rau củ quả, cách sơ chế/chế biến, bảo quản, gợi ý món ăn, và thành phần cơ bản như vitamin, khoáng chất, chất xơ.",
              "Không tư vấn dinh dưỡng chuyên sâu, không lập thực đơn điều trị, không nói sản phẩm chữa bệnh, không thay thế bác sĩ/chuyên gia dinh dưỡng.",
              "Khi khách hỏi về farm, tồn kho, chứng nhận, ngày thu hoạch hoặc cách canh tác, chỉ dùng FARM DATA bên dưới. Nếu không có thông tin, nói rõ VieGarden chưa upload thông tin đó.",
              "Trả lời bằng tiếng Việt, ngắn gọn, thân thiện. Không dùng Markdown thô như dấu *, **, ###. Nếu cần liệt kê, viết mỗi ý trên một dòng bắt đầu bằng dấu gạch ngang '-'.",
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
        { error: result?.error?.message || "AI Assistant chưa tạo được phản hồi." },
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
            encoder.encode(error instanceof Error ? `\n${error.message}` : "\nKhông thể đọc phản hồi AI."),
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
    return errorStream(error instanceof Error ? error.message : "Không thể kết nối AI Assistant.");
  }
}
