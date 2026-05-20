"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Calendar,
  Camera,
  CheckCircle2,
  Leaf,
  MapPin,
  Plus,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { CameraFeed } from "@/components/ui/CameraFeed";
import { MOCK_BATCH_INFO } from "@/lib/mockData";
import { farmImages } from "@/lib/viegardenData";

export default function TraceabilityPage({ params }: { params: { batchId: string } }) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const batch = MOCK_BATCH_INFO;
  const [certs, setCerts] = useState(batch.certifications);
  const [newCert, setNewCert] = useState("");

  const addCert = () => {
    const value = newCert.trim();
    if (value && !certs.includes(value)) {
      setCerts([...certs, value]);
      setNewCert("");
    }
  };

  const removeCert = (certToRemove: string) => {
    setCerts(certs.filter((cert) => cert !== certToRemove));
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="h-[360px]">
          <img src={farmImages.greenhouse} alt="Khu trồng VieGarden" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-black/20" />
        <div className="container-page absolute inset-x-0 bottom-10">
          <div className="max-w-3xl text-white">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              QR Traceability | {params.batchId}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Nguồn gốc minh bạch từ khu vườn</h1>
            <p className="mt-4 max-w-2xl text-white/85">
              Khách hàng có thể xem thông tin lô rau, chứng nhận, nhật ký chăm sóc và Live Cam trước khi tin chọn sản phẩm.
            </p>
          </div>
        </div>
      </section>

      <div className="container-page -mt-8 space-y-10 pb-16">
        <section className="relative z-10 rounded-3xl border bg-card p-6 shadow-xl md:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <div className="mb-3 flex items-center gap-2 text-primary">
                <Leaf className="h-5 w-5" />
                <span className="font-bold">Lô nông sản VieGarden</span>
              </div>
              <h2 className="text-3xl font-extrabold">{batch.cropType}</h2>
              <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {batch.farm}
              </div>
            </div>
            <div className="rounded-2xl bg-secondary p-4 text-left md:text-right">
              <div className="text-sm text-muted-foreground">Mã lô hàng</div>
              <div className="font-mono text-xl font-extrabold tracking-wider text-primary">{batch.id}</div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoTile icon={<Calendar className="h-5 w-5" />} label="Ngày gieo" value={batch.plantedAt} />
            <InfoTile icon={<Calendar className="h-5 w-5" />} label="Dự kiến thu hoạch" value={batch.expectedHarvest} />
            <InfoTile icon={<User className="h-5 w-5" />} label="Kỹ sư phụ trách" value={batch.manager} />
            <InfoTile icon={<ShieldCheck className="h-5 w-5" />} label="Trạng thái" value={batch.status} highlight />
          </div>

          <div className="mt-8 border-t pt-8">
            <h3 className="mb-4 font-extrabold text-primary">Chứng nhận chất lượng</h3>
            <div className="flex flex-wrap items-center gap-3">
              {certs.length === 0 && (
                <span className="rounded-full bg-secondary px-4 py-2 text-sm text-muted-foreground">
                  Chưa có chứng nhận
                </span>
              )}
              {certs.map((cert) => (
                <div
                  key={cert}
                  className="group flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Chứng nhận {cert}
                  {isAdmin && (
                    <button
                      onClick={() => removeCert(cert)}
                      className="rounded-full p-0.5 text-primary/60 transition-colors hover:bg-primary/10 hover:text-primary"
                      title="Xóa chứng nhận"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isAdmin && (
              <div className="mt-6 flex max-w-md items-center gap-2 rounded-2xl border border-dashed bg-secondary/50 p-2">
                <input
                  type="text"
                  placeholder="Tên chứng nhận mới, ví dụ: GlobalGAP..."
                  value={newCert}
                  onChange={(event) => setNewCert(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && addCert()}
                  className="flex-1 border-none bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-0"
                />
                <button
                  onClick={addCert}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"
                  aria-label="Thêm chứng nhận"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center gap-2 text-primary">
              <Camera className="h-5 w-5" />
              <h3 className="text-2xl font-extrabold">Live Cam khu trồng</h3>
            </div>
            <CameraFeed />
          </div>
          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <Image src="/camera-feed.png" alt="Ảnh lô rau" width={800} height={600} className="mb-5 aspect-[4/3] rounded-2xl object-cover" />
            <h3 className="text-xl font-extrabold text-primary">Tình trạng hôm nay</h3>
            <p className="mt-3 leading-7 text-muted-foreground">
              Lá xanh đều, hệ thống tưới tự động hoạt động ổn định. Lô rau đang ở giai đoạn phát triển mạnh và sẵn sàng cho lịch thu hoạch dự kiến.
            </p>
          </div>
        </section>

        <section>
          <h3 className="mb-8 text-2xl font-extrabold text-primary">Nhật ký canh tác</h3>
          <div className="rounded-3xl border bg-card p-6 shadow-sm md:p-8">
            <TimelineItem date="01/04/2026" title="Gieo hạt" desc="Sử dụng hạt giống chuẩn VietGAP, gieo trên giá thể xơ dừa." done />
            <TimelineItem date="05/04/2026" title="Nảy mầm" desc="Tỉ lệ nảy mầm đạt 98%, đưa lên giàn thủy canh hồi lưu." done />
            <TimelineItem date="15/04/2026" title="Kiểm tra chất lượng định kỳ" desc="Bổ sung dinh dưỡng thủy canh, điều chỉnh pH ở mức 6.5." done />
            <TimelineItem date="24/04/2026" title="Giai đoạn phát triển mạnh" desc="Cây cao 20cm, lá xanh mướt, hệ thống cảnh báo nhiệt độ hoạt động tốt." done />
            <TimelineItem date="26/04/2026" title="Dự kiến thu hoạch" desc="Sẵn sàng đóng gói và phân phối sau bước kiểm tra cuối." done={false} last />
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoTile({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className={`font-bold ${highlight ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}

function TimelineItem({
  date,
  title,
  desc,
  done,
  last,
}: {
  date: string;
  title: string;
  desc: string;
  done: boolean;
  last?: boolean;
}) {
  return (
    <div className="relative flex gap-5 pb-8 last:pb-0">
      <div className="flex flex-col items-center">
        <div className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${done ? "bg-primary text-white" : "border-2 bg-card text-muted-foreground"}`}>
          {done ? <CheckCircle2 className="h-6 w-6" /> : <span className="h-3 w-3 rounded-full bg-muted-foreground" />}
        </div>
        {!last && <div className={`mt-2 h-full w-px ${done ? "bg-primary/30" : "bg-border"}`} />}
      </div>
      <div className={done ? "opacity-100" : "opacity-60"}>
        <div className="mb-1 text-sm font-extrabold text-primary">{date}</div>
        <h4 className="text-lg font-extrabold">{title}</h4>
        <p className="mt-2 leading-7 text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
