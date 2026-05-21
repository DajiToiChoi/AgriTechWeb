"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, BookOpen, Info, Map, Menu, Sprout, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const links = [
  { href: "/", label: "Trang chủ", icon: Sprout },
  { href: "/farms", label: "Trang trại", icon: Map },
  { href: "/about", label: "Về chúng tôi", icon: Info },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/marketing", label: "AI Assistant", icon: Bot },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderLink = (link: (typeof links)[number], mobile = false) => {
    const Icon = link.icon;
    const baseHref = link.href.split("/").slice(0, 2).join("/");
    const currentBase = pathname.split("/").slice(0, 2).join("/");
    const isActive = link.href === "/" ? pathname === "/" : baseHref === currentBase;

    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setIsMenuOpen(false)}
        className={cn(
          "flex items-center gap-2 rounded-full font-semibold transition-colors",
          mobile ? "px-4 py-3 text-base" : "px-3 py-2 text-sm",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        )}
      >
        <Icon className="h-4 w-4" />
        {link.label}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-border/60 bg-card/90 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-primary">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sprout className="h-5 w-5" />
          </span>
          VieGarden
        </Link>

        <div className="hidden items-center gap-1 lg:flex">{links.map((link) => renderLink(link))}</div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-background text-primary lg:hidden"
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t bg-card lg:hidden">
          <div className="container-page flex flex-col gap-2 py-4">{links.map((link) => renderLink(link, true))}</div>
        </div>
      )}
    </nav>
  );
}
