import Link from "next/link";
import { ArrowRight, MapPin, Search, SlidersHorizontal, Star } from "lucide-react";
import { featuredFarms } from "@/lib/viegardenData";

const categories = ["Tất cả", "Hữu cơ", "Thủy canh", "Nông nghiệp đô thị", "Vườn cây ăn trái", "Dâu tây & quả mọng"];

export default function FarmsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container-page py-14">
        <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-primary">Khám phá mạng lưới</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
              Tìm kiếm trang trại bền vững gần bạn
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Duyệt các trang trại có Live Cam, dữ liệu truy xuất và nhật ký canh tác minh bạch.
            </p>
          </div>

          <div className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                className="w-full rounded-2xl border bg-card py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tìm theo loại cây, địa điểm hoặc tên..."
              />
            </div>
          </div>
        </div>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold ${
                index === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredFarms.concat(featuredFarms).map((farm, index) => (
            <article key={`${farm.name}-${index}`} className="farm-card-shadow overflow-hidden rounded-3xl border bg-card">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={farm.image} alt={farm.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {farm.badge}
                </span>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                  <MapPin className="h-4 w-4" />
                  {farm.location}
                </div>
                <h2 className="text-xl font-extrabold">{farm.name}</h2>
                <p className="mt-3 line-clamp-3 leading-7 text-muted-foreground">{farm.description}</p>
                <Link href="/trace/RM202604001" className="mt-6 inline-flex items-center justify-between gap-2 border-t pt-4 font-semibold text-primary">
                  Xem chi tiết & Live Cam
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <button className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-8 py-4 font-semibold text-primary">
            <SlidersHorizontal className="h-5 w-5" />
            Xem thêm trang trại
          </button>
          <p className="text-sm text-muted-foreground">Đang hiển thị 6 trên 142 trang trại bền vững</p>
        </div>
      </section>
    </main>
  );
}
