import Link from "next/link";
import { ArrowRight, Camera, Eye, Mail, MessageCircle, Users } from "lucide-react";
import { farmImages } from "@/lib/viegardenData";

const posts = [
  {
    title: "Gáº·p gá»¡ nÃ´ng dÃ¢n cá»§a báº¡n",
    meta: "Cá»™ng Ä‘á»“ng | 5 phÃºt Ä‘á»c",
    text: "CÃ¹ng trÃ² chuyá»‡n vÃ  tÃ¬m hiá»ƒu tÃ¢m huyáº¿t cá»§a nhá»¯ng ngÆ°á»i Ä‘ang ngÃ y Ä‘Ãªm chÄƒm sÃ³c bá»¯a Äƒn cho gia Ä‘Ã¬nh báº¡n.",
    image: farmImages.greenhouse,
  },
  {
    title: "HÃ nh trÃ¬nh tá»« vÆ°á»n Ä‘áº¿n bÃ n Äƒn",
    meta: "Thá»‹ trÆ°á»ng | 8 phÃºt Ä‘á»c",
    text: "CÃ¡ch VieGarden rÃºt ngáº¯n thá»i gian váº­n chuyá»ƒn nÃ´ng sáº£n sau thu hoáº¡ch vÃ  giá»¯ Ä‘á»™ tÆ°Æ¡i tá»‘t hÆ¡n.",
    image: farmImages.fields,
  },
  {
    title: "BÃ­ quyáº¿t giá»¯ rau luÃ´n tÆ°Æ¡i ngon",
    meta: "Chia sáº» | 4 phÃºt Ä‘á»c",
    text: "Máº¹o nhá» tá»« cá»™ng Ä‘á»“ng VieGarden giÃºp báº£o quáº£n thá»±c pháº©m há»¯u cÆ¡ táº¡i gia hiá»‡u quáº£.",
    image: farmImages.produce,
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container-page py-16 text-center">
        <span className="rounded-full bg-secondary px-4 py-2 text-sm font-bold text-primary">
          Káº¿t ná»‘i vá»›i nguá»“n thá»±c pháº©m
        </span>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
          Theo dÃµi tá»«ng máº§m xanh phÃ¡t triá»ƒn táº¡i VieGarden
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          Cáº­p nháº­t hÃ¬nh áº£nh trá»±c tiáº¿p tá»« trang tráº¡i vÃ  cÃ¢u chuyá»‡n tá»« nhá»¯ng ngÆ°á»i nÃ´ng dÃ¢n tÃ¢m huyáº¿t.
        </p>
      </section>

      <section className="container-page grid gap-6 pb-16 lg:grid-cols-12">
        <article className="overflow-hidden rounded-[2rem] border bg-card shadow-sm lg:col-span-8">
          <div className="relative aspect-video overflow-hidden">
            <img src={farmImages.hero} alt="Live Camera VieGarden" className="h-full w-full object-cover" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
              <span className="h-2 w-2 rounded-full bg-white" />
              TRá»°C TIáº¾P
            </span>
          </div>
          <div className="p-8">
            <div className="mb-4 flex gap-3 text-sm font-semibold">
              <span className="text-primary">GiÃ¡m sÃ¡t trá»±c tiáº¿p</span>
              <span className="text-muted-foreground">12 ThÃ¡ng 3, 2026</span>
            </div>
            <h2 className="text-3xl font-extrabold text-primary">TÃ­nh nÄƒng Live Camera: xem rau cá»§a báº¡n lá»›n lÃªn má»—i ngÃ y</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              Vá»›i há»‡ thá»‘ng camera trá»±c tuyáº¿n, khÃ¡ch hÃ ng cÃ³ thá»ƒ theo dÃµi quÃ¡ trÃ¬nh chÄƒm sÃ³c vÃ  thu hoáº¡ch táº¡i khu vÆ°á»n báº¥t cá»© lÃºc nÃ o.
            </p>
            <Link href="/farms" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
              Xem Farm Together
              <Camera className="h-4 w-4" />
            </Link>
          </div>
        </article>

        <aside className="space-y-6 lg:col-span-4">
          <div className="rounded-[2rem] border bg-card p-8 shadow-sm">
            <h3 className="text-2xl font-extrabold text-primary">Minh báº¡ch tuyá»‡t Ä‘á»‘i qua mÃ n áº£nh nhá»</h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              Há»‡ thá»‘ng giÃ¡m sÃ¡t giÃºp khÃ¡ch hÃ ng biáº¿t thá»i Ä‘iá»ƒm cÃ¢y Ä‘Æ°á»£c tÆ°á»›i nÆ°á»›c, chÄƒm sÃ³c vÃ  Ä‘Ã³ng gÃ³i.
            </p>
            <Link href="/farms" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
              Xem cÃ¢u chuyá»‡n farm
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-[2rem] bg-primary p-8 text-primary-foreground">
            <h3 className="text-2xl font-extrabold">Tham gia cá»™ng Ä‘á»“ng</h3>
            <p className="mt-4 text-white/85">Giao lÆ°u vá»›i cÃ¡c trang tráº¡i thÃ nh viÃªn vÃ  Ä‘áº·t hÃ ng nÃ´ng sáº£n sáº¡ch khi vá»«a thu hoáº¡ch.</p>
            <div className="mt-6 flex overflow-hidden rounded-2xl bg-white/10">
              <input className="min-w-0 flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-white/60" placeholder="Email" />
              <button className="px-4"><Mail className="h-5 w-5" /></button>
            </div>
          </div>
        </aside>
      </section>

      <section className="container-page grid gap-6 pb-16 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.title} className="overflow-hidden rounded-3xl border bg-card shadow-sm">
            <div className="relative aspect-video">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded bg-black/50 px-2 py-1 text-xs text-white">
                <Eye className="h-3.5 w-3.5" />
                1.2k
              </span>
            </div>
            <div className="p-6">
              <p className="mb-2 text-sm font-semibold text-muted-foreground">{post.meta}</p>
              <h3 className="text-xl font-extrabold">{post.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{post.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-secondary/60 py-16">
        <div className="container-page">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-bold uppercase tracking-[0.18em] text-primary">Tham gia cá»™ng Ä‘á»“ng</p>
              <h2 className="mt-3 text-3xl font-extrabold text-primary">NÆ¡i nÃ´ng dÃ¢n & khÃ¡ch hÃ ng káº¿t ná»‘i</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">HÆ¡n 5,000 thÃ nh viÃªn Ä‘ang chia sáº» kinh nghiá»‡m vÃ  Ä‘áº·t hÃ ng trá»±c tiáº¿p tá»« farm.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
              <Users className="h-5 w-5" />
              VÃ o diá»…n Ä‘Ã n tháº£o luáº­n
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Má»Ÿ web ra lÃ  tháº¥y ngay rau mÃ¬nh Ä‘áº·t Ä‘ang Ä‘Æ°á»£c tÆ°á»›i nÆ°á»›c qua Live Camera. Cáº£m giÃ¡c ráº¥t yÃªn tÃ¢m.",
              "Tá»« khi cÃ³ Live Camera, tÃ´i nháº­n Ä‘Æ°á»£c nhiá»u lá»i há»i thÄƒm tá»« khÃ¡ch hÃ ng hÆ¡n.",
              "Vá»«a Ä‘áº·t hÃ ng xong lÃ  tháº¥y thÃ´ng bÃ¡o farm báº¯t Ä‘áº§u Ä‘Ã³ng gÃ³i. Dá»‹ch vá»¥ minh báº¡ch vÃ  hiá»‡n Ä‘áº¡i.",
            ].map((quote, index) => (
              <div key={quote} className="rounded-3xl bg-card p-6 shadow-sm">
                <MessageCircle className="mb-5 h-6 w-6 text-primary" />
                <p className="italic leading-7 text-muted-foreground">"{quote}"</p>
                <p className="mt-5 font-bold text-primary">ThÃ nh viÃªn #{index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


