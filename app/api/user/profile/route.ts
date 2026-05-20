import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Chưa đăng nhập." }, { status: 401 });
    }

    const { name } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json({ message: "Tên không được để trống." }, { status: 400 });
    }

    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: { name: name.trim() }
    });

    return NextResponse.json({ message: "Cập nhật thành công", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi cập nhật profile:", error);
    return NextResponse.json({ message: "Đã xảy ra lỗi hệ thống." }, { status: 500 });
  }
}
