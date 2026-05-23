import Link from "next/link";
import { Facebook, Globe2, Mail, MapPin, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Link href="/" className="mb-4 flex items-center" aria-label="VieGarden trang chủ">
            <img src="/logo-viegarden.svg" alt="VieGarden" className="h-14 w-auto max-w-[220px] object-contain" />
          </Link>
          <p className="leading-7 text-muted-foreground">
            Nuôi dưỡng niềm tin thông qua nông nghiệp minh bạch, trải nghiệm nông trại và trợ lý AI cho nông sản sạch.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              href="https://www.facebook.com/Viegarden26"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook VieGarden"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary" href="#" aria-label="Website">
              <Globe2 className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-extrabold text-primary">Khám phá</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li><Link className="hover:text-primary" href="/farms">Trang trại</Link></li>
            <li><Link className="hover:text-primary" href="/about">Về chúng tôi</Link></li>
            <li><Link className="hover:text-primary" href="/blog">Blog</Link></li>
            <li><Link className="hover:text-primary" href="/marketing">AI Assistant</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-extrabold text-primary">Liên hệ</h3>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex gap-3"><Mail className="h-5 w-5 text-primary" /> viegarden2026@gmail.com</li>
            <li className="flex gap-3"><MapPin className="h-5 w-5 text-primary" /> Hà Nội</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-extrabold text-primary">Bản tin</h3>
          <p className="mb-4 text-muted-foreground">Nhận thông báo khi có sản phẩm mới và lịch trải nghiệm farm.</p>
          <div className="flex overflow-hidden rounded-2xl border bg-background">
            <input className="min-w-0 flex-1 bg-transparent px-4 py-3 outline-none" placeholder="Email của bạn" />
            <button className="bg-primary px-4 text-primary-foreground" aria-label="Đăng ký bản tin">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="container-page flex flex-col justify-between gap-3 py-6 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 VieGarden. Bảo lưu mọi quyền.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary">Chính sách bảo mật</a>
            <a href="#" className="hover:text-primary">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
