# SmartFarm Agritech Platform

Đây là dự án nền tảng quản lý Nông nghiệp Thông minh (SmartFarm) dành riêng cho ứng dụng IoT, truy xuất nguồn gốc nông sản và tự động hóa các nội dung AI Marketing. Dự án được phát triển bằng **Next.js (App Router)**, cơ sở dữ liệu **PostgreSQL** kết hợp **Prisma ORM**, và hệ thống xác thực **NextAuth.js**.

## 🛠 Yêu cầu hệ thống (Prerequisites)

Để chạy được dự án này trên máy của bạn, bạn cần cài đặt các công cụ sau:
1. **Node.js**: Phiên bản 18.x trở lên.
   - Kiểm tra bằng lệnh: `node -v`
   - Cài đặt (trên Windows): Mở PowerShell và gõ `winget install OpenJS.NodeJS`
2. **PostgreSQL**: Dùng để làm cơ sở dữ liệu.
   - Bạn có thể tải và cài đặt pgAdmin & PostgreSQL từ trang chủ.
   - Nhớ giữ lại thông tin Username và Password lúc cài đặt.

## 🚀 Hướng dẫn cài đặt và khởi chạy

Thực hiện lần lượt các bước sau trong Terminal (đảm bảo Terminal đang trỏ vào thư mục `web`):

### Bước 1: Cài đặt các thư viện phụ thuộc
Chạy lệnh sau để tải về toàn bộ các module cần thiết:
```bash
npm install
```

### Bước 2: Thiết lập biến môi trường (.env)
Bạn cần kiểm tra file `.env` nằm ở thư mục gốc của dự án. Nội dung file chuẩn sẽ có dạng:
```env
# Thay đổi postgres và 291104 thành tên đăng nhập và mật khẩu DB của bạn
DATABASE_URL="postgresql://postgres:291104@localhost:5432/agritech"

# Khóa bảo mật cho NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="super-secret-key-smartfarm-2026-very-secure"
```
*Lưu ý:* Hãy mở **pgAdmin** và tạo sẵn một cơ sở dữ liệu có tên là `agritech` trước khi chuyển sang bước tiếp theo.

### Bước 3: Đẩy cấu trúc vào Database
Sử dụng Prisma để tự động tạo các bảng (User, Farm, CropBatch...) vào PostgreSQL:
```bash
npx prisma db push
```
*(Nếu thành công, terminal sẽ báo "The database is now in sync with your schema".)*

### Bước 4: Khởi động Server
Chạy lệnh sau để bật môi trường phát triển:
```bash
npm run dev
```

Sau khi server khởi động xong, bạn hãy mở trình duyệt và truy cập vào địa chỉ: **http://localhost:3000**

---

## 🏗 Cấu trúc và Phân quyền (RBAC)

Hệ thống cung cấp 3 vai trò (Role) khi người dùng đăng ký:
1. **Khách hàng (CUSTOMER)**: 
   - Chỉ được xem giao diện Preview (Trang chủ) và Quét mã QR truy xuất nguồn gốc (VD: `/trace/RM202604001`).
   - Không thể truy cập vào Dashboard.
2. **Chủ trang trại (FARMER)**:
   - Truy cập vào `/dashboard` để xem thông số Farm, thông báo cảm biến thời gian thực.
   - Xem AI Marketing Engine.
3. **Quản trị viên (ADMIN)**:
   - Có toàn quyền như Farmer.
   - Giao diện Dashboard sẽ hiển thị thêm **Admin Panel**.
   - Có quyền **Thêm/Xóa các chứng chỉ** tại trang Truy xuất nguồn gốc.

## 📝 Các lệnh hữu ích khác

- Cập nhật Prisma Schema sau khi bạn sửa file `prisma/schema.prisma`:
  ```bash
  npx prisma db push
  ```
- Xóa cache bộ nhớ đệm nếu code bị kẹt lỗi:
  ```bash
  Remove-Item -Recurse -Force .next
  npm run dev
  ```
- Mở Prisma Studio để xem dữ liệu thô trong Database trực tiếp trên trình duyệt:
  ```bash
  npx prisma studio
  ```
