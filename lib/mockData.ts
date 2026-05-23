export const CROP_STANDARDS = {
  leafy_greens: {
    temperature: { min: 22, max: 32, unit: "Â°C", name: "Nhiá»‡t Ä‘á»™" },
    humidity: { min: 65, max: 90, unit: "%", name: "Äá»™ áº©m KK" },
    soilMoisture: { min: 70, max: 85, unit: "%", name: "Äá»™ áº©m Ä‘áº¥t" },
    pH: { min: 6.0, max: 7.0, unit: "", name: "Äá»™ pH" },
    ec: { min: 1.2, max: 2.0, unit: "mS/cm", name: "EC" },
    light: { min: 10000, max: 25000, unit: "Lux", name: "Ãnh sÃ¡ng" },
  },
  rau_muong: {
    temperature: { min: 22, max: 32, unit: "Â°C", name: "Nhiá»‡t Ä‘á»™" },
    humidity: { min: 65, max: 90, unit: "%", name: "Äá»™ áº©m KK" },
    soilMoisture: { min: 70, max: 85, unit: "%", name: "Äá»™ áº©m Ä‘áº¥t" },
    pH: { min: 6.0, max: 7.0, unit: "", name: "Äá»™ pH" },
    ec: { min: 1.2, max: 2.0, unit: "mS/cm", name: "EC" },
    light: { min: 10000, max: 25000, unit: "Lux", name: "Ãnh sÃ¡ng" },
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
  { id: 1, type: "warning", message: "Äá»™ pH Ä‘ang giáº£m gáº§n ngÆ°á»¡ng an toÃ n (6.1)", time: "10 phÃºt trÆ°á»›c", resolved: false },
  { id: 2, type: "critical", message: "Nhiá»‡t Ä‘á»™ tÄƒng cao báº¥t thÆ°á»ng (33.2Â°C) - há»‡ thá»‘ng lÃ m mÃ¡t Ä‘Ã£ kÃ­ch hoáº¡t", time: "1 giá» trÆ°á»›c", resolved: true },
  { id: 3, type: "info", message: "ÄÃ£ báº­t bÆ¡m tÆ°á»›i khu rau xanh Farm Together", time: "2 giá» trÆ°á»›c", resolved: true },
];

export const MOCK_PRODUCTION_LOGS = [
  { id: 1, action: "Thu hoáº¡ch rau cáº£i Ä‘á»£t 1", user: "Admin", date: "2026-04-24", batch: "AD-RAUCAI-001" },
  { id: 2, action: "Kiá»ƒm tra luá»‘ng Ä‘áº­u que", user: "Ká»¹ sÆ° HÃ¹ng", date: "2026-04-20", batch: "AD-DAUQUE-001" },
  { id: 3, action: "Kiá»ƒm tra mÃ¹ng tÆ¡i Ä‘á»‹nh ká»³ - Tá»‘t", user: "Ká»¹ sÆ° HÃ¹ng", date: "2026-04-18", batch: "AD-MUNGTOI-001" },
  { id: 4, action: "Gieo háº¡t rau cáº£i máº» má»›i", user: "Admin", date: "2026-04-15", batch: "AD-RAUCAI-002" },
];

export const MOCK_BATCH_INFO = {
  id: "AD-PRODUCE-001",
  cropType: "MÃ¹ng tÆ¡i, rau cáº£i, Ä‘áº­u que",
  farm: "Farm Together",
  plantedAt: "2026-04-01",
  expectedHarvest: "2026-04-26",
  status: "Äang cáº­p nháº­t theo mÃ¹a",
  certifications: ["Äá»‘i tÃ¡c farm"],
  manager: "Farm Together",
};

export const MOCK_AI_MARKETING = [
  {
    platform: "Facebook",
    content:
      "Farm Together hiá»‡n cÃ³ rau mÃ¹ng tÆ¡i, rau cáº£i vÃ  Ä‘áº­u que cho bá»¯a cÆ¡m gia Ä‘Ã¬nh.\n\n- MÃ¹ng tÆ¡i há»£p náº¥u canh thanh mÃ¡t\n- Rau cáº£i cÃ³ thá»ƒ luá»™c hoáº·c xÃ o tá»i\n- Äáº­u que giÃ²n, há»£p xÃ o nhanh vá»›i thá»‹t hoáº·c náº¥m\n\nVieGarden gá»£i Ã½ combo dá»… náº¥u, dá»… báº£o quáº£n vÃ  phÃ¹ há»£p bá»¯a Äƒn háº±ng ngÃ y.",
    likes: 124,
    shares: 12,
  },
  {
    platform: "Product Description",
    content:
      "Combo rau xanh Farm Together gá»“m rau mÃ¹ng tÆ¡i, rau cáº£i vÃ  Ä‘áº­u que. CÃ¡c sáº£n pháº©m phÃ¹ há»£p cho nhá»¯ng mÃ³n Äƒn gia Ä‘Ã¬nh Ä‘Æ¡n giáº£n nhÆ° canh, luá»™c, xÃ o tá»i hoáº·c xÃ o cÃ¹ng thá»‹t/náº¥m. NÃªn báº£o quáº£n trong ngÄƒn mÃ¡t 2-4Â°C vÃ  dÃ¹ng sá»›m Ä‘á»ƒ giá»¯ Ä‘á»™ tÆ°Æ¡i.",
  },
];


