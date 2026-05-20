"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Leaf } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      if (isLogin) {
        // Xử lý Đăng nhập
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (res?.error) {
          setError(res.error);
        } else {
          router.push("/dashboard");
          router.refresh();
        }
      } else {
        // Xử lý Đăng ký
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
        } else {
          setSuccess("Đăng ký thành công! Đang tự động đăng nhập...");
          // Tự động đăng nhập sau khi đăng ký
          const loginRes = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });
          
          if (!loginRes?.error) {
            router.push(role === "CUSTOMER" ? "/" : "/dashboard");
            router.refresh();
          }
        }
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md p-8 bg-card rounded-2xl border shadow-lg z-10 mt-16">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-secondary text-primary rounded-full mb-4">
            <Leaf className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">{isLogin ? "Đăng nhập" : "Đăng ký tài khoản"}</h1>
          <p className="text-muted-foreground text-sm mt-1">SmartFarm Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">{error}</div>}
          {success && <div className="p-3 text-sm text-green-700 bg-green-500/10 border border-green-500/20 rounded-lg">{success}</div>}
          
          {!isLogin && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Họ và Tên</label>
                <input 
                  type="text" 
                  required={!isLogin}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Vai trò</label>
                <select 
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="CUSTOMER">Khách hàng (Customer)</option>
                  <option value="FARMER">Chủ trang trại / Nông dân</option>
                  <option value="ADMIN">Quản trị viên (Admin)</option>
                </select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="user@smartfarm.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Mật khẩu</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity mt-4 disabled:opacity-70"
          >
            {isLoading ? "Đang xử lý..." : (isLogin ? "Đăng nhập" : "Tạo tài khoản")}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
          </span>
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}
            className="text-primary font-medium hover:underline"
          >
            {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
          </button>
        </div>
      </div>
    </div>
  );
}
