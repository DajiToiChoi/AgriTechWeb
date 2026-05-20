import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Chỉ có ADMIN hoặc FARMER mới được vào dashboard và profile
    if (path.startsWith("/dashboard") || path.startsWith("/profile")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    }
  }
);

// Áp dụng middleware cho các route cần bảo vệ
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"]
};
