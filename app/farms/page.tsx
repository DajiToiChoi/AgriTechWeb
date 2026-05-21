import Link from "next/link";
import { ArrowRight, Leaf, MapPin, Star } from "lucide-react";
import { farmProducts, featuredFarms } from "@/lib/viegardenData";

export default function FarmsPage() {
  const farm = featuredFarms[0];

  return (
    <main className="min-h-screen bg-background">
      <section className="container-page py-14">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-primary">Trang trại đối tác</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
            Farm Anh Đạt
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Hiện VieGarden đang tập trung hợp tác với Farm Anh Đạt. Các sản phẩm đang có gồm rau mùng tơi, rau cải và đậu que.
          </p>
        </div>

        <article className="farm-card-shadow grid overflow-hidden rounded-[2rem] border bg-card lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden">
            <img src={farm.image} alt={farm.name} className="h-full w-full object-cover" />
            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur">
              <Star className="h-3.5 w-3.5 fill-current" />
              {farm.badge}
            </span>
          </div>
          <div className="p-8">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
              <MapPin className="h-4 w-4" />
              {farm.location}
            </div>
            <h2 className="text-3xl font-extrabold text-primary">{farm.name}</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{farm.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {farmProducts.map((product) => (
                <div key={product.name} className="rounded-2xl bg-secondary/70 p-4">
                  <Leaf className="mb-3 h-5 w-5 text-primary" />
                  <p className="font-bold text-primary">{product.name}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
                </div>
              ))}
            </div>

            <Link href="/marketing" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
              Hỏi AI gợi ý combo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
