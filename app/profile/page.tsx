import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import ProfileForm from "./ProfileForm";
import { User, ShieldCheck, Mail } from "lucide-react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  // Fetch updated user data from DB
  const user = await db.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-12">
      <main className="container px-6 pt-12 max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold mb-2 text-primary">Thông tin cá nhân</h1>
          <p className="text-muted-foreground">Quản lý tài khoản và cài đặt bảo mật của bạn.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Cột hiển thị nhanh */}
          <div className="md:col-span-1 space-y-4">
            <div className="p-6 bg-card border rounded-2xl shadow-sm text-center">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-lg">{user.name || "Chưa cập nhật"}</h3>
              <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                {user.role}
              </p>
            </div>
          </div>

          {/* Form chỉnh sửa */}
          <div className="md:col-span-2">
            <div className="p-6 bg-card border rounded-2xl shadow-sm">
              <ProfileForm 
                defaultName={user.name || ""} 
                email={user.email} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
