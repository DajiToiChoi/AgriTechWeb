import Link from "next/link";
import { ArrowRight, Camera, HeartHandshake, Leaf, Sprout, Users } from "lucide-react";
import { farmImages } from "@/lib/viegardenData";

const values = [
  {
    icon: Camera,
    title: "Minh bạch qua giám sát trực tiếp",
    text: "Khách hàng theo dõi hành trình của từng mầm cây từ lúc gieo hạt đến khi thu hoạch.",
  },
  {
    icon: Users,
    title: "Gắn kết cộng đồng",
    text: "Tạo không gian để người mua, người trồng và đối tác cùng chia sẻ kinh nghiệm.",
  },
  {
    icon: HeartHandshake,
    title: "Niềm tin từ sự chân thực",
    text: "Không chỉ là dữ liệu, VieGarden kể câu chuyện thật về nông nghiệp Việt.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container-page grid items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-primary">Về chúng tôi</p>
          <h1 className="text-4xl font-extrabold leading-tight text-primary md:text-5xl">
            Kết nối cộng đồng qua từng hạt mầm xanh.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            VieGarden không chỉ là công nghệ. Đây là hành trình kết nối con người với đất, với người nông dân và với nguồn thực phẩm minh bạch hơn.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-card p-6 shadow-sm">
              <p className="text-3xl font-extrabold text-primary">5,000+</p>
              <p className="mt-2 text-muted-foreground">Thành viên cùng chia sẻ trải nghiệm thu hoạch.</p>
            </div>
            <div className="rounded-3xl bg-card p-6 shadow-sm">
              <p className="text-3xl font-extrabold text-primary">142</p>
              <p className="mt-2 text-muted-foreground">Trang trại bền vững trong mạng lưới demo.</p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem]">
          <img src={farmImages.greenhouse} alt="Cộng đồng VieGarden" className="aspect-[4/3] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-xl font-extrabold">Gắn kết bằng sự chân thực</p>
            <p className="mt-2 text-white/85">Không gian để mọi người học hỏi và cùng kiến tạo hệ sinh thái thực phẩm sạch.</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-16">
        <div className="container-page">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-primary">Điều VieGarden theo đuổi</h2>
            <p className="mt-4 text-muted-foreground">Công nghệ chỉ có ý nghĩa khi giúp niềm tin trở nên kiểm chứng được.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-3xl bg-card p-8 shadow-sm">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-primary">{value.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{value.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Kết nối đầu tiên", "Bắt đầu từ nhóm nhỏ những người yêu vườn, chia sẻ mẹo trồng rau và nguồn nông sản sạch."],
            ["Hình thành mạng lưới", "Mở rộng thành cộng đồng kết nối hộ gia đình với các chủ vườn nhỏ và farm công nghệ."],
            ["Lan tỏa giá trị", "Hướng tới biểu tượng của sự minh bạch và cộng đồng trong nông nghiệp Việt."],
          ].map(([title, text], index) => (
            <div key={title} className="rounded-3xl border bg-card p-6 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {index === 0 ? <Sprout className="h-5 w-5" /> : <Leaf className="h-5 w-5" />}
              </div>
              <h3 className="text-xl font-extrabold">{title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] bg-primary p-10 text-center text-primary-foreground">
          <h2 className="text-3xl font-extrabold">Viết tiếp câu chuyện cùng chúng tôi?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Tham gia cộng đồng VieGarden để cùng tạo nên thay đổi tích cực từ sự minh bạch và chân thành.
          </p>
          <Link href="/farms" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary">
            Khám phá trang trại
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
