import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email và mật khẩu là bắt buộc." }, { status: 400 });
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await db.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email này đã được sử dụng." }, { status: 400 });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "FARMER", // Mặc định là FARMER nếu không chọn
      }
    });

    return NextResponse.json({ message: "Đăng ký thành công!", user: { id: user.id, email: user.email } }, { status: 201 });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    return NextResponse.json({ message: "Đã xảy ra lỗi hệ thống." }, { status: 500 });
  }
}
