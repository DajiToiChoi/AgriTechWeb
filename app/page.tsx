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
    title: "GiÃ¡m sÃ¡t Live Cam",
    text: "Theo dÃµi khu vÆ°á»n, hoáº¡t Ä‘á»™ng chÄƒm sÃ³c vÃ  nhá»¯ng khoáº£nh kháº¯c phÃ¡t triá»ƒn ná»•i báº­t cá»§a farm.",
  },
  {
    icon: Leaf,
    title: "Tráº£i nghiá»‡m táº¡i vÆ°á»n",
    text: "TÃ¬m hiá»ƒu Farm Together, cÃ¢u chuyá»‡n há»£p tÃ¡c vÃ  Ä‘á»‹nh hÆ°á»›ng tráº£i nghiá»‡m nÃ´ng nghiá»‡p minh báº¡ch.",
  },
  {
    icon: Users,
    title: "Gáº¯n káº¿t cá»™ng Ä‘á»“ng",
    text: "Káº¿t ná»‘i khÃ¡ch hÃ ng vá»›i ngÆ°á»i lÃ m nÃ´ng báº±ng hÃ¬nh áº£nh, dá»¯ liá»‡u vÃ  cÃ¢u chuyá»‡n tháº­t.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
        <img src={farmImages.hero} alt="NÃ´ng tráº¡i xanh" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="container-page relative z-10 py-20">
          <div className="max-w-2xl text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              VieGarden x Farm Together
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Káº¿t ná»‘i tráº£i nghiá»‡m nÃ´ng tráº¡i chÃ¢n thá»±c
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
              VieGarden giá»›i thiá»‡u hÃ nh trÃ¬nh há»£p tÃ¡c cÃ¹ng Farm Together vá»›i cÃ¡c loáº¡i rau cá»§ hiá»‡n cÃ³ nhÆ° rau mÃ¹ng tÆ¡i, rau cáº£i vÃ  Ä‘áº­u que.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/farms"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                KhÃ¡m phÃ¡ Farm Together
                <Camera className="h-5 w-5" />
              </Link>
              <Link
                href="/marketing"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-primary transition-transform hover:scale-[1.02]"
              >
                Thá»­ AI Assistant
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
              Minh báº¡ch tá»« tráº£i nghiá»‡m Ä‘áº¿n dá»¯ liá»‡u
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
              Website giá»›i thiá»‡u dá»± Ã¡n VieGarden
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Giai Ä‘oáº¡n hiá»‡n táº¡i táº­p trung giá»›i thiá»‡u dá»± Ã¡n, Ä‘á»‘i tÃ¡c Farm Together, ná»™i dung cá»™ng Ä‘á»“ng vÃ  AI Assistant. Táº¥t cáº£ ná»™i dung Ä‘Æ°á»£c má»Ÿ cÃ´ng khai cho khÃ¡ch hÃ ng, chÆ°a phÃ¢n loáº¡i ngÆ°á»i dÃ¹ng.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Rau mÃ¹ng tÆ¡i", "Rau cáº£i", "Äáº­u que", "AI gá»£i Ã½ mÃ³n Äƒn"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={farmImages.greenhouse} alt="Rau há»¯u cÆ¡" className="h-80 w-full rounded-3xl object-cover shadow-lg" />
            <img src={farmImages.fields} alt="Luá»‘ng cÃ¢y" className="mt-10 h-80 w-full rounded-3xl object-cover shadow-lg" />
          </div>
        </div>
      </section>

      <section className="section-gap bg-secondary/60">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-primary md:text-4xl">
              GiÃ¡ trá»‹ cá»§a sá»± tráº£i nghiá»‡m vÃ  gáº¯n káº¿t
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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Trang tráº¡i Ä‘á»‘i tÃ¡c</p>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl">
              Farm Together
            </h2>
          </div>
          <Link href="/farms" className="inline-flex items-center gap-2 font-semibold text-primary">
            Xem trang tráº¡i
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
                  Xem chi tiáº¿t farm
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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Sáº£n pháº©m hiá»‡n cÃ³</p>
            <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl">
              Rau cá»§ quáº£ táº¡i Farm Together
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              Website sáº½ má»Ÿ rá»™ng theo nhiá»u loáº¡i nÃ´ng sáº£n. Giai Ä‘oáº¡n hiá»‡n táº¡i táº­p trung vÃ o ba sáº£n pháº©m chÃ­nh Ä‘ang cÃ³ táº¡i farm.
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
                  Trá»±c tuyáº¿n
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="ml-auto max-w-[85%] rounded-3xl rounded-tr-sm bg-primary/10 p-4 text-sm">
                Rau mÃ¹ng tÆ¡i, rau cáº£i vÃ  Ä‘áº­u que nÃªn mua combo tháº¿ nÃ o?
              </div>
              <div className="max-w-[88%] rounded-3xl rounded-tl-sm bg-secondary p-4 text-sm">
                Combo dá»… náº¥u cho gia Ä‘Ã¬nh: mÃ¹ng tÆ¡i náº¥u canh, rau cáº£i luá»™c hoáº·c xÃ o tá»i, Ä‘áº­u que xÃ o nhanh vá»›i thá»‹t hoáº·c náº¥m.
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
              Trá»£ lÃ½ thÃ´ng minh
            </div>
            <h2 className="text-3xl font-extrabold leading-tight text-primary md:text-5xl">
              AI há»— trá»£ combo vÃ  cÃ¡ch cháº¿ biáº¿n
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              AI Assistant táº­p trung vÃ o gá»£i Ã½ combo rau cá»§, cÃ¡ch sÆ¡ cháº¿, cháº¿ biáº¿n, báº£o quáº£n vÃ  thÃ nh pháº§n cÆ¡ báº£n nhÆ° vitamin, cháº¥t xÆ¡.
            </p>
            <Link href="/marketing" className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground">
              Má»Ÿ AI Assistant
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-center text-white">
          <img src={farmImages.produce} alt="NÃ´ng sáº£n tÆ°Æ¡i" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/65" />
          <div className="relative mx-auto max-w-3xl">
            <CalendarDays className="mx-auto mb-5 h-9 w-9" />
            <h2 className="text-3xl font-extrabold">CÃ¹ng VieGarden ká»ƒ cÃ¢u chuyá»‡n nÃ´ng tráº¡i minh báº¡ch.</h2>
            <p className="mt-4 text-white/90">
              Website hiá»‡n táº­p trung giá»›i thiá»‡u dá»± Ã¡n vÃ  Ä‘á»‘i tÃ¡c, má»Ÿ toÃ n bá»™ ná»™i dung cho khÃ¡ch hÃ ng ghÃ© xem.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


