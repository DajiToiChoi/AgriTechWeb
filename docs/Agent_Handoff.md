# Hướng dẫn Bàn giao (Agent Handoff Document)
**Dự án:** Agritech Platform (SmartFarm)
**Mục đích:** Tóm tắt toàn bộ bối cảnh, cấu trúc kiến trúc và tiến độ công việc để Agent AI tiếp theo có thể dễ dàng đọc và tiếp tục phát triển mà không làm gãy logic.

---

## 1. Tổng quan dự án (Project Overview)
Nền tảng Nông nghiệp Thông minh cho rau sạch, tích hợp dữ liệu cảm biến IoT, camera giám sát, cổng truy xuất nguồn gốc (QR Code) và tự động hóa AI Marketing.

## 2. Tech Stack & Công nghệ sử dụng
- **Framework:** Next.js 14 (App Router), TypeScript.
- **Styling:** Tailwind CSS (Giao diện chuẩn Light mode, tone màu Xanh-Trắng).
- **Database & ORM:** PostgreSQL 18, Prisma.
- **Authentication:** NextAuth.js v4 (Provider: Credentials + bcrypt mã hóa).

## 3. Các tính năng đã hoàn thiện (Current State)
Dự án đã hoàn thành **Giai đoạn 1 (UI/UX)** và **Giai đoạn 2 (Backend & Auth)**:

1. **Cơ sở dữ liệu & Prisma**:
   - File `prisma/schema.prisma` đã định nghĩa các bảng: `User`, `Farm`, `CropBatch`, `Certificate`.
2. **Hệ thống Auth & RBAC (Phân quyền)**:
   - Hệ thống chia làm 3 Role: `ADMIN`, `FARMER`, `CUSTOMER`.
   - `middleware.ts` bảo vệ nghiêm ngặt các route `/dashboard/:path*` và `/profile/:path*`.
   - Trang Đăng nhập/Đăng ký nằm ở `app/(auth)/login/page.tsx`. Tự động gán Session có chứa `user.id` và `user.role`.
3. **Các trang chính (Pages)**:
   - **Trang chủ (`/`)**: Web Preview dành cho `CUSTOMER` vãng lai.
   - **Dashboard (`/dashboard`)**: Dành cho `FARMER` (xem dữ liệu) và `ADMIN` (xem toàn bộ + Admin Panel). Hiện tại phần biểu đồ và thông số đang lấy tạm từ `lib/mockData.ts` để làm giao diện.
   - **Truy xuất nguồn gốc (`/trace/[batchId]`)**: Trang công khai cho khách quét mã. Đặc biệt: **Tính năng Thêm/Xóa chứng chỉ chỉ hiển thị cho ADMIN**.
   - **AI Marketing (`/marketing`)**: Giao diện tạo nội dung quảng cáo.
   - **Profile (`/profile`)**: Nơi người dùng cập nhật thông tin cá nhân.
4. **Layout**: Đã xây dựng `Navbar.tsx` dùng chung, hỗ trợ Dropdown User Profile và thay đổi linh hoạt theo Session.

## 4. Ghi chú Môi trường cho Agent tiếp theo (Environment Context)
- OS của User là **Windows**.
- Lúc đầu User không có Node.js, nhưng hiện đã cài thành công. Lỗi mạng `ECONNRESET` lúc chạy `npm install` đã được fix sạch sẽ.
- PostgreSQL đã được cấu hình trong `DATABASE_URL` (`.env`). User cần chạy `npx prisma db push` để sync DB trước khi bật server.

## 5. Các bước tiếp theo cần làm (Next Steps)
Agent tiếp theo khi nhận dự án vui lòng thực hiện theo thứ tự ưu tiên sau:
1. **Thay thế Mock Data bằng Real Data**: Vào `app/dashboard/page.tsx` và `app/trace/[batchId]/page.tsx`, xóa `MOCK_DATA` và thay bằng lệnh query thực tế qua Prisma (`db.farm.findMany`, `db.cropBatch.findUnique`).
2. **Tích hợp phần cứng (IoT)**: Viết API Route để nhận dữ liệu từ ESP32 bắn lên và lưu vào PostgreSQL/Firebase.
3. **Tích hợp Camera**: Xử lý logic nhúng luồng HLS/RTSP (qua MediaMTX) vào component `CameraFeed`.
4. **Tích hợp OpenRouter AI**: Bổ sung logic fetch API OpenAI/OpenRouter vào trang `/marketing` để render nội dung động.

---
*Văn bản này được tự động tạo vào tháng 5/2026. Chúc Agent kế nhiệm làm việc hiệu quả cùng User!*
