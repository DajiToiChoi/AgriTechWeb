"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Bot,
  BookOpen,
  Info,
  LayoutDashboard,
  LogOut,
  Map,
  QrCode,
  Sprout,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (pathname === "/login") return null;

  const links = [
    { href: "/", label: "Trang chủ", icon: Sprout, public: true },
    { href: "/farms", label: "Trang trại", icon: Map, public: true },
    { href: "/about", label: "Về chúng tôi", icon: Info, public: true },
    { href: "/blog", label: "Blog", icon: BookOpen, public: true },
    { href: "/trace/RM202604001", label: "Truy xuất", icon: QrCode, public: true },
    { href: "/marketing", label: "AI Assistant", icon: Bot, public: true },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, public: false },
  ];

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-border/60 bg-card/85 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-primary">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sprout className="h-5 w-5" />
            </span>
            VieGarden
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links
              .filter((link) => link.public || session)
              .map((link) => {
                const Icon = link.icon;
                const baseHref = link.href.split("/").slice(0, 2).join("/");
                const currentBase = pathname.split("/").slice(0, 2).join("/");
                const isActive = link.href === "/" ? pathname === "/" : baseHref === currentBase;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="relative flex items-center gap-4" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-2 transition-colors hover:bg-secondary/70"
              >
                <div className="hidden text-left text-sm font-medium sm:block">
                  <div className="text-xs font-normal text-muted-foreground">Xin chào,</div>
                  <span className="text-primary">{session.user?.name || session.user?.email}</span>
                </div>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  {session.user?.role}
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border bg-card py-2 shadow-xl animate-in fade-in slide-in-from-top-2">
                  <Link
                    href="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-secondary"
                  >
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    Thông tin cá nhân
                  </Link>
                  <div className="my-1 h-px bg-border" />
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Bắt đầu trải nghiệm
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
