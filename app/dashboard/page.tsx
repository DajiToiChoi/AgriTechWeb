import Link from "next/link";
import { getServerSession } from "next-auth";
import {
  Bell,
  ClipboardList,
  Droplet,
  FlaskConical,
  MapPin,
  ShieldAlert,
  Sprout,
  Sun,
  Thermometer,
  Zap,
} from "lucide-react";
import { CameraFeed } from "@/components/ui/CameraFeed";
import { RealtimeChart } from "@/components/ui/RealtimeChart";
import { SensorCard } from "@/components/ui/SensorCard";
import { authOptions } from "@/lib/auth";
import { CROP_STANDARDS, MOCK_ALERTS, MOCK_PRODUCTION_LOGS, MOCK_SENSOR_CURRENT } from "@/lib/mockData";
import { farmImages } from "@/lib/viegardenData";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const std = CROP_STANDARDS.rau_muong;

  return (
    <main className="min-h-screen bg-background pb-16">
      <section className="relative overflow-hidden bg-primary text-white">
        <img src={farmImages.fields} alt="Trang trại VieGarden" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="container-page relative py-12 md:py-16">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-lime-300" />
                Farm Together đang vận hành ổn định
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
                Trung tâm vận hành trang trại
              </h1>
              <p className="mt-4 max-w-2xl text-white/85">
                Theo dõi cảm biến, Live Cam, cảnh báo và nhật ký canh tác của khu rau xanh Farm Together trong cùng một màn hình.
              </p>
            </div>
            <div className="rounded-3xl bg-white/12 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <div>
                  <p className="text-sm text-white/70">Vị trí</p>
                  <p className="font-bold">Đông Anh, Hà Nội</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page space-y-10 pt-10">
        <section>
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">IoT Sensor</p>
              <h2 className="mt-2 text-2xl font-extrabold text-primary">Trạng thái cảm biến khu rau xanh Farm Together</h2>
            </div>
            <Link href="/farms" className="font-semibold text-primary hover:underline">
              Xem trang Farm Together
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <SensorCard title={std.temperature.name} value={MOCK_SENSOR_CURRENT.temperature} unit={std.temperature.unit} icon={<Thermometer className="h-5 w-5" />} min={std.temperature.min} max={std.temperature.max} />
            <SensorCard title={std.humidity.name} value={MOCK_SENSOR_CURRENT.humidity} unit={std.humidity.unit} icon={<Droplet className="h-5 w-5" />} min={std.humidity.min} max={std.humidity.max} />
            <SensorCard title={std.soilMoisture.name} value={MOCK_SENSOR_CURRENT.soilMoisture} unit={std.soilMoisture.unit} icon={<Sprout className="h-5 w-5" />} min={std.soilMoisture.min} max={std.soilMoisture.max} />
            <SensorCard title={std.pH.name} value={MOCK_SENSOR_CURRENT.pH} unit={std.pH.unit} icon={<FlaskConical className="h-5 w-5" />} min={std.pH.min} max={std.pH.max} />
            <SensorCard title={std.ec.name} value={MOCK_SENSOR_CURRENT.ec} unit={std.ec.unit} icon={<Zap className="h-5 w-5" />} min={std.ec.min} max={std.ec.max} />
            <SensorCard title={std.light.name} value={MOCK_SENSOR_CURRENT.light} unit={std.light.unit} icon={<Sun className="h-5 w-5" />} min={std.light.min} max={std.light.max} />
          </div>
        </section>

        {session.user.role === "ADMIN" && (
          <section className="rounded-3xl border border-primary/20 bg-primary/10 p-6">
            <div className="flex items-center gap-3 text-primary">
              <ShieldAlert className="h-6 w-6" />
              <h2 className="text-xl font-extrabold">Khu vực Admin</h2>
            </div>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Tài khoản admin có thể kiểm soát farm, người dùng, chứng nhận và trạng thái công khai của từng lô hàng.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
                Quản lý người dùng
              </button>
              <button className="rounded-full border bg-card px-5 py-3 text-sm font-semibold text-primary">
                Kiểm duyệt chứng nhận
              </button>
            </div>
          </section>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="rounded-3xl border bg-card p-6 shadow-sm">
              <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h3 className="text-xl font-extrabold text-primary">Biểu đồ nhiệt độ theo thời gian</h3>
                  <p className="text-sm text-muted-foreground">Mock data hiện có, sẵn sàng thay bằng dữ liệu sensor thật.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-3 w-3 rounded-full bg-primary" />
                  Nhiệt độ
                </div>
              </div>
              <RealtimeChart dataKey="temperature" color="hsl(var(--primary))" />
            </section>

            <section className="rounded-3xl border bg-card p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-extrabold text-primary">Live Cam khu trồng</h3>
                <p className="text-sm text-muted-foreground">Giao diện theo dõi trực tiếp giống định hướng VieGarden.</p>
              </div>
              <CameraFeed />
            </section>
          </div>

          <aside className="space-y-8">
            <section className="rounded-3xl border bg-card p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-extrabold text-primary">Cảnh báo hệ thống</h3>
              </div>
              <div className="space-y-4">
                {MOCK_ALERTS.map((alert) => (
                  <div
                    key={alert.id}
                    className={`rounded-2xl border p-4 ${
                      alert.type === "critical"
                        ? "border-destructive/20 bg-destructive/10"
                        : alert.type === "warning"
                          ? "border-amber-400/30 bg-amber-50"
                          : "border-border bg-secondary/50"
                    }`}
                  >
                    <p className="text-sm font-semibold">{alert.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border bg-card p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-extrabold text-primary">Nhật ký gần đây</h3>
              </div>
              <div>
                {MOCK_PRODUCTION_LOGS.map((log, index) => (
                  <div key={log.id} className="relative pb-6 pl-6 last:pb-0">
                    {index !== MOCK_PRODUCTION_LOGS.length - 1 && <div className="absolute left-[7px] top-2 h-full w-px bg-border" />}
                    <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-card" />
                    <p className="font-semibold">{log.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {log.date} | {log.user}
                    </p>
                  </div>
                ))}
              </div>
              <Link href="/farms" className="mt-6 block rounded-full bg-secondary px-5 py-3 text-center text-sm font-semibold text-primary">
                Xem thông tin farm công khai
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
