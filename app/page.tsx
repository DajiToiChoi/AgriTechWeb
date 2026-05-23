import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Camera,
  CheckCircle2,
  Leaf,
  MapPin,
  Users,
} from "lucide-react";
import { farmImages, farmProducts, featuredFarms, quickPrompts } from "@/lib/viegardenData";

const values = [
  {
    icon: Camera,
    title: "Giám sát Live Cam",
    text: "Theo dõi khu vườn, hoạt động chăm sóc và những khoảnh khắc phát triển nổi bật của farm.",
  },
  {
    icon: Leaf,
    title: "Trải nghiệm tại vườn",
    text: "Tìm hiểu Farm Together, câu chuyện hợp tác và định hướng trải nghiệm nông nghiệp minh bạch.",
  },
  {
    icon: Users,
    title: "Gắn kết cộng đồng",
    text: "Kết nối khách hàng với người làm nông bằng hình ảnh, dữ liệu và câu chuyện thật.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
        <img src={farmImages.hero} alt="Nông trại xanh" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="container-page relative z-10 py-20">
          <div className="max-w-2xl text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              VieGarden x Farm Together
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Kết nối trải nghiệm nông trại chân thực
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
              VieGarden giới thiệu hành trình hợp tác cùng Farm Together với các loại rau củ hiện có như rau mùng tơi, rau cải và đậu que.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/farms"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Khám phá Farm Together
                <Camera className="h-5 w-5" />
              </Link>
              <Link
                href="/marketing"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-primary transition-transform hover:scale-[1.02]"
              >
                Thử AI Assistant
                <Bot className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Minh bạch từ trải nghiệm đến dữ liệu
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
              Website giới thiệu dự án VieGarden
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Giai đoạn hiện tại tập trung giới thiệu dự án, đối tác Farm Together, nội dung cộng đồng và AI Assistant. Tất cả nội dung được mở công khai cho khách hàng, chưa phân loại người dùng.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Rau mùng tơi", "Rau cải", "Đậu que", "AI gợi ý món ăn"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={farmImages.greenhouse} alt="Rau hữu cơ" className="h-80 w-full rounded-3xl object-cover shadow-lg" />
            <img src={farmImages.fields} alt="Luống cây" className="mt-10 h-80 w-full rounded-3xl object-cover shadow-lg" />
          </div>
        </div>
      </section>

      <section className="section-gap bg-secondary/60">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-primary md:text-4xl">
              Giá trị của sự trải nghiệm và gắn kết
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-3xl bg-card p-8 shadow-sm transition-transform hover:-translate-y-1">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{value.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{value.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-gap container-page">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Trang trại đối tác</p>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl">Farm Together</h2>
          </div>
          <Link href="/farms" className="inline-flex items-center gap-2 font-semibold text-primary">
            Xem trang trại
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredFarms.map((farm) => (
            <article key={farm.name} className="farm-card-shadow overflow-hidden rounded-3xl border bg-card">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={farm.image} alt={farm.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur">
                  {farm.badge}
                </span>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                  <MapPin className="h-4 w-4" />
                  {farm.location}
                </div>
                <h3 className="text-xl font-bold">{farm.name}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{farm.description}</p>
                <Link href="/farms" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                  Xem chi tiết farm
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-gap bg-card">
        <div className="container-page">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Sản phẩm hiện có</p>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl">
              Rau củ quả tại Farm Together
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              Website sẽ mở rộng theo nhiều loại nông sản. Giai đoạn hiện tại tập trung vào ba sản phẩm chính đang có tại farm.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {farmProducts.map((product) => (
              <article key={product.name} className="rounded-3xl border bg-background p-6 shadow-sm">
                <h3 className="text-xl font-extrabold text-primary">{product.name}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{product.description}</p>
                <div className="mt-5 rounded-2xl bg-secondary/70 p-4 text-sm text-muted-foreground">
                  {product.basicComponents}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gap bg-card">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-md rounded-[2rem] border bg-background p-5 shadow-2xl">
            <div className="mb-4 flex items-center gap-3 border-b pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold">VieGarden AI</p>
                <p className="flex items-center gap-2 text-xs text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Trực tuyến
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="ml-auto max-w-[85%] rounded-3xl rounded-tr-sm bg-primary/10 p-4 text-sm">
                Rau mùng tơi, rau cải và đậu que nên mua combo thế nào?
              </div>
              <div className="max-w-[88%] rounded-3xl rounded-tl-sm bg-secondary p-4 text-sm">
                Combo dễ nấu cho gia đình: mùng tơi nấu canh, rau cải luộc hoặc xào tỏi, đậu que xào nhanh với thịt hoặc nấm.
              </div>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <span key={prompt} className="rounded-full border bg-card px-3 py-2 text-xs text-muted-foreground">
                    {prompt}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <Bot className="h-4 w-4" />
              Trợ lý thông minh
            </div>
            <h2 className="text-3xl font-extrabold leading-tight text-primary md:text-5xl">
              AI hỗ trợ combo và cách chế biến
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              AI Assistant tập trung vào gợi ý combo rau củ, cách sơ chế, chế biến, bảo quản và thành phần cơ bản như vitamin, chất xơ.
            </p>
            <Link href="/marketing" className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground">
              Mở AI Assistant
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-center text-white">
          <img src={farmImages.produce} alt="Nông sản tươi" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/65" />
          <div className="relative mx-auto max-w-3xl">
            <CalendarDays className="mx-auto mb-5 h-9 w-9" />
            <h2 className="text-3xl font-extrabold">Cùng VieGarden kể câu chuyện nông trại minh bạch.</h2>
            <p className="mt-4 text-white/90">
              Website hiện tập trung giới thiệu dự án và đối tác, mở toàn bộ nội dung cho khách hàng ghé xem.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
