import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getFarmKnowledge, saveFarmKnowledge } from "@/lib/farmKnowledge";

export const runtime = "nodejs";

export async function GET() {
  const knowledge = await getFarmKnowledge();
  return NextResponse.json(knowledge);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (!session || (role !== "ADMIN" && role !== "FARMER")) {
    return NextResponse.json(
      { error: "Bạn cần quyền FARMER hoặc ADMIN để cập nhật dữ liệu farm." },
      { status: 403 },
    );
  }

  try {
    const body = (await request.json()) as { content?: string };
    const knowledge = await saveFarmKnowledge(body.content || "");
    return NextResponse.json(knowledge);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không thể lưu dữ liệu farm." },
      { status: 400 },
    );
  }
}
