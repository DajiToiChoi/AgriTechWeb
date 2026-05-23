import Link from "next/link";
import { ArrowRight, Camera, Eye, Mail, MessageCircle, Users } from "lucide-react";
import { farmImages } from "@/lib/viegardenData";

const posts = [
  {
    title: "Gặp gỡ nông dân của bạn",
    meta: "Cộng đồng | 5 phút đọc",
    text: "Cùng trò chuyện và tìm hiểu tâm huyết của những người đang ngày đêm chăm sóc bữa ăn cho gia đình bạn.",
    image: farmImages.greenhouse,
  },
  {
    title: "Hành trình từ vườn đến bàn ăn",
    meta: "Thị trường | 8 phút đọc",
    text: "Cách VieGarden rút ngắn thời gian vận chuyển nông sản sau thu hoạch và giữ độ tươi tốt hơn.",
    image: farmImages.fields,
  },
  {
    title: "Bí quyết giữ rau luôn tươi ngon",
    meta: "Chia sẻ | 4 phút đọc",
    text: "Mẹo nhỏ từ cộng đồng VieGarden giúp bảo quản thực phẩm hữu cơ tại gia hiệu quả.",
    image: farmImages.produce,
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container-page py-16 text-center">
        <span className="rounded-full bg-secondary px-4 py-2 text-sm font-bold text-primary">
          Kết nối với nguồn thực phẩm
        </span>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
          Theo dõi từng mầm xanh phát triển tại VieGarden
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
          Cập nhật hình ảnh trực tiếp từ trang trại và câu chuyện từ những người nông dân tâm huyết.
        </p>
      </section>

      <section className="container-page grid gap-6 pb-16 lg:grid-cols-12">
        <article className="overflow-hidden rounded-[2rem] border bg-card shadow-sm lg:col-span-8">
          <div className="relative aspect-video overflow-hidden">
            <img src={farmImages.hero} alt="Live Camera VieGarden" className="h-full w-full object-cover" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
              <span className="h-2 w-2 rounded-full bg-white" />
              TRỰC TIẾP
            </span>
          </div>
          <div className="p-8">
            <div className="mb-4 flex gap-3 text-sm font-semibold">
              <span className="text-primary">Giám sát trực tiếp</span>
              <span className="text-muted-foreground">12 Tháng 3, 2026</span>
            </div>
            <h2 className="text-3xl font-extrabold text-primary">Tính năng Live Camera: xem rau của bạn lớn lên mỗi ngày</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              Với hệ thống camera trực tuyến, khách hàng có thể theo dõi quá trình chăm sóc và thu hoạch tại khu vườn bất cứ lúc nào.
            </p>
            <Link href="/farms" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
              Xem Farm Together
              <Camera className="h-4 w-4" />
            </Link>
          </div>
        </article>

        <aside className="space-y-6 lg:col-span-4">
          <div className="rounded-[2rem] border bg-card p-8 shadow-sm">
            <h3 className="text-2xl font-extrabold text-primary">Minh bạch tuyệt đối qua màn ảnh nhỏ</h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              Hệ thống giám sát giúp khách hàng biết thời điểm cây được tưới nước, chăm sóc và đóng gói.
            </p>
            <Link href="/farms" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
              Xem câu chuyện farm
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-[2rem] bg-primary p-8 text-primary-foreground">
            <h3 className="text-2xl font-extrabold">Tham gia cộng đồng</h3>
            <p className="mt-4 text-white/85">Giao lưu với các trang trại thành viên và đặt hàng nông sản sạch khi vừa thu hoạch.</p>
            <div className="mt-6 flex overflow-hidden rounded-2xl bg-white/10">
              <input className="min-w-0 flex-1 bg-transparent px-4 py-3 outline-none placeholder:text-white/60" placeholder="Email" />
              <button className="px-4" aria-label="Đăng ký email"><Mail className="h-5 w-5" /></button>
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
              <p className="font-bold uppercase tracking-[0.18em] text-primary">Tham gia cộng đồng</p>
              <h2 className="mt-3 text-3xl font-extrabold text-primary">Nơi nông dân & khách hàng kết nối</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">Hơn 5,000 thành viên đang chia sẻ kinh nghiệm và đặt hàng trực tiếp từ farm.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
              <Users className="h-5 w-5" />
              Vào diễn đàn thảo luận
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Mở web ra là thấy ngay rau mình đặt đang được tưới nước qua Live Camera. Cảm giác rất yên tâm.",
              "Từ khi có Live Camera, tôi nhận được nhiều lời hỏi thăm từ khách hàng hơn.",
              "Vừa đặt hàng xong là thấy thông báo farm bắt đầu đóng gói. Dịch vụ minh bạch và hiện đại.",
            ].map((quote, index) => (
              <div key={quote} className="rounded-3xl bg-card p-6 shadow-sm">
                <MessageCircle className="mb-5 h-6 w-6 text-primary" />
                <p className="italic leading-7 text-muted-foreground">"{quote}"</p>
                <p className="mt-5 font-bold text-primary">Thành viên #{index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
