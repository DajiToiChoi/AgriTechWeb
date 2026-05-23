export const CROP_STANDARDS = {
  leafy_greens: {
    temperature: { min: 22, max: 32, unit: "°C", name: "Nhiệt độ" },
    humidity: { min: 65, max: 90, unit: "%", name: "Độ ẩm KK" },
    soilMoisture: { min: 70, max: 85, unit: "%", name: "Độ ẩm đất" },
    pH: { min: 6.0, max: 7.0, unit: "", name: "Độ pH" },
    ec: { min: 1.2, max: 2.0, unit: "mS/cm", name: "EC" },
    light: { min: 10000, max: 25000, unit: "Lux", name: "Ánh sáng" },
  },
  rau_muong: {
    temperature: { min: 22, max: 32, unit: "°C", name: "Nhiệt độ" },
    humidity: { min: 65, max: 90, unit: "%", name: "Độ ẩm KK" },
    soilMoisture: { min: 70, max: 85, unit: "%", name: "Độ ẩm đất" },
    pH: { min: 6.0, max: 7.0, unit: "", name: "Độ pH" },
    ec: { min: 1.2, max: 2.0, unit: "mS/cm", name: "EC" },
    light: { min: 10000, max: 25000, unit: "Lux", name: "Ánh sáng" },
  },
};

export const MOCK_SENSOR_CURRENT = {
  temperature: 28.5,
  humidity: 75,
  soilMoisture: 78,
  pH: 6.5,
  ec: 1.6,
  light: 15400,
};

export const MOCK_CHART_DATA = Array.from({ length: 24 }).map((_, i) => {
  const time = new Date();
  time.setMinutes(time.getMinutes() - (24 - i) * 5);

  return {
    time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
  { id: 2, type: "critical", message: "Nhiệt độ tăng cao bất thường (33.2°C) - hệ thống làm mát đã kích hoạt", time: "1 giờ trước", resolved: true },
  { id: 3, type: "info", message: "Đã bật bơm tưới khu rau xanh Farm Together", time: "2 giờ trước", resolved: true },
];

export const MOCK_PRODUCTION_LOGS = [
  { id: 1, action: "Thu hoạch rau cải đợt 1", user: "Admin", date: "2026-04-24", batch: "FT-RAUCAI-001" },
  { id: 2, action: "Kiểm tra luống đậu que", user: "Kỹ sư Hùng", date: "2026-04-20", batch: "FT-DAUQUE-001" },
  { id: 3, action: "Kiểm tra mùng tơi định kỳ - Tốt", user: "Kỹ sư Hùng", date: "2026-04-18", batch: "FT-MUNGTOI-001" },
  { id: 4, action: "Gieo hạt rau cải mẻ mới", user: "Admin", date: "2026-04-15", batch: "FT-RAUCAI-002" },
];

export const MOCK_BATCH_INFO = {
  id: "FT-PRODUCE-001",
  cropType: "Mùng tơi, rau cải, đậu que",
  farm: "Farm Together",
  plantedAt: "2026-04-01",
  expectedHarvest: "2026-04-26",
  status: "Đang cập nhật theo mùa",
  certifications: ["Đối tác farm", "Hữu cơ"],
  manager: "Farm Together",
};

export const MOCK_AI_MARKETING = [
  {
    platform: "Facebook",
    content:
      "Farm Together hiện có rau mùng tơi, rau cải và đậu que cho bữa cơm gia đình.\n\n- Mùng tơi hợp nấu canh thanh mát\n- Rau cải có thể luộc hoặc xào tỏi\n- Đậu que giòn, hợp xào nhanh với thịt hoặc nấm\n\nVieGarden gợi ý combo dễ nấu, dễ bảo quản và phù hợp bữa ăn hằng ngày.",
    likes: 124,
    shares: 12,
  },
  {
    platform: "Product Description",
    content:
      "Combo rau xanh Farm Together gồm rau mùng tơi, rau cải và đậu que. Các sản phẩm phù hợp cho những món ăn gia đình đơn giản như canh, luộc, xào tỏi hoặc xào cùng thịt/nấm. Nên bảo quản trong ngăn mát 2-4°C và dùng sớm để giữ độ tươi.",
  },
];
