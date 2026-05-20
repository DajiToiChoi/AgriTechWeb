"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Mail, User as UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfileForm({ defaultName, email }: { defaultName: string, email: string }) {
  const [name, setName] = useState(defaultName);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const router = useRouter();
  const { update } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setMessage({ text: "Cập nhật thông tin thành công!", type: "success" });
        // Update session in client
        await update({ name });
        router.refresh();
      } else {
        const error = await res.json();
        setMessage({ text: error.message || "Đã xảy ra lỗi.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Lỗi kết nối.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="font-semibold text-lg border-b pb-4">Chỉnh sửa hồ sơ</h3>
      
      {message.text && (
        <div className={`p-3 text-sm rounded-lg ${message.type === 'success' ? 'bg-green-500/10 text-green-700 border border-green-500/20' : 'bg-destructive/10 text-destructive border border-destructive/20'}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email (Không thể thay đổi)</label>
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="email" 
              disabled
              value={email}
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-secondary/50 text-muted-foreground cursor-not-allowed"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Họ và Tên</label>
          <div className="relative">
            <UserIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Nhập họ và tên..."
            />
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          type="submit" 
          disabled={isLoading || name === defaultName}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Lưu thay đổi
        </button>
      </div>
    </form>
  );
}
