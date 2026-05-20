export const CROP_STANDARDS = {
  rau_muong: {
    temperature: { min: 22, max: 32, unit: "°C", name: "Nhiệt độ" },
    humidity: { min: 65, max: 90, unit: "%", name: "Độ ẩm KK" },
    soilMoisture: { min: 70, max: 85, unit: "%", name: "Độ ẩm đất" },
    pH: { min: 6.0, max: 7.0, unit: "", name: "Độ pH" },
    ec: { min: 1.2, max: 2.0, unit: "mS/cm", name: "EC" },
    light: { min: 10000, max: 25000, unit: "Lux", name: "Ánh sáng" }
  }
};

export const MOCK_SENSOR_CURRENT = {
  temperature: 28.5,
  humidity: 75,
  soilMoisture: 78,
  pH: 6.5,
  ec: 1.6,
  light: 15400,
};

// Generate some mock history for the chart (last 24 points, e.g., 2 hours)
export const MOCK_CHART_DATA = Array.from({ length: 24 }).map((_, i) => {
  const time = new Date();
  time.setMinutes(time.getMinutes() - (24 - i) * 5);
  
  return {
    time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperature: 28 + (Math.random() * 2 - 1),
    humidity: 75 + (Math.random() * 5 - 2.5),
    soilMoisture: 78 + (Math.random() * 4 - 2),
    pH: 6.5 + (Math.random() * 0.4 - 0.2),
    ec: 1.6 + (Math.random() * 0.2 - 0.1),
    light: 15000 + (Math.random() * 2000 - 1000),
  };
});

export const MOCK_ALERTS = [
  { id: 1, type: "warning", message: "Độ pH đang giảm gần ngưỡng an toàn (6.1)", time: "10 phút trước", resolved: false },
  { id: 2, type: "critical", message: "Nhiệt độ tăng cao bất thường (33.2°C) - Hệ thống làm mát đã kích hoạt", time: "1 giờ trước", resolved: true },
  { id: 3, type: "info", message: "Đã bật bơm tưới lô RM-01", time: "2 giờ trước", resolved: true },
];

export const MOCK_PRODUCTION_LOGS = [
  { id: 1, action: "Thu hoạch đợt 1", user: "Admin", date: "2026-04-24", batch: "RM202604001" },
  { id: 2, action: "Phun phòng nấm sinh học", user: "Kỹ sư Hùng", date: "2026-04-20", batch: "RM202604002" },
  { id: 3, action: "Kiểm tra định kỳ - Tốt", user: "Kỹ sư Hùng", date: "2026-04-18", batch: "RM202604001" },
  { id: 4, action: "Gieo hạt mẻ mới", user: "Admin", date: "2026-04-15", batch: "RM202604002" },
];

export const MOCK_BATCH_INFO = {
  id: "RM202604001",
  cropType: "Rau Muống (Water Spinach)",
  farm: "VietGAP Smart Farm 01",
  plantedAt: "2026-04-01",
  expectedHarvest: "2026-04-26",
  status: "Sắp thu hoạch",
  certifications: ["VietGAP", "Organic-Transition"],
  manager: "Nguyễn Văn Hùng",
};

export const MOCK_AI_MARKETING = [
  {
    platform: "Facebook",
    content: "🌱 Rau muống thuỷ canh siêu sạch từ Smart Farm đã sẵn sàng lên mâm nhà bạn!\n\n✨ Trồng bằng công nghệ IoT, kiểm soát 100% nhiệt độ, độ ẩm và dinh dưỡng.\n✨ Không thuốc trừ sâu, không hóa chất độc hại.\n✨ Rau giòn, ngọt thanh, xanh mướt.\n\nQuét mã QR trên bao bì để xem toàn bộ quá trình sinh trưởng nhé! 🥬👇\n\n#RauSach #SmartFarm #NongNghiepSach #VietGAP",
    likes: 124,
    shares: 12
  },
  {
    platform: "Product Description",
    content: "Sản phẩm Rau Muống Thuỷ Canh được canh tác tại Smart Farm 01. Áp dụng quy trình chuẩn VietGAP kết hợp công nghệ theo dõi cảm biến 24/7, đảm bảo cây trồng luôn ở trạng thái phát triển tối ưu. Dữ liệu độ ẩm, pH và EC được tự động hóa, loại bỏ hoàn toàn dư lượng hóa chất. Rau có hương vị tự nhiên, giòn ngọt, an toàn tuyệt đối cho bữa ăn gia đình."
  }
]
