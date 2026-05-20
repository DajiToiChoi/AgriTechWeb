import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const knowledgePath = path.join(dataDir, "farm-knowledge.json");

export type FarmKnowledge = {
  content: string;
  updatedAt: string | null;
};

const defaultKnowledge = `
VieGarden currently monitors crop batch RM202604001.
Crop: Rau muống thủy canh VietGAP.
Farm: Farm Anh Đạt, Đà Lạt, Lâm Đồng.
Growing method: hydroponic, IoT-monitored temperature, humidity, pH, EC, moisture and light.
Planting date: 01/04/2026.
Expected harvest date: 26/04/2026.
Current status: cây phát triển ổn định, lá xanh, sẵn sàng kiểm tra trước thu hoạch.
Certifications: VietGAP.
Basic ingredient notes: rau muống thường được dùng để xào tỏi, luộc, nấu canh chua; có chất xơ và một số vitamin/khoáng chất ở mức tham khảo.
Customer answer policy: suggest combos, storage, preparation, cooking ideas and basic components only. Do not provide deep nutrition, medical claims, disease treatment or therapeutic meal plans.
If uploaded data does not contain an answer about farm inventory, harvest date, certification or batch status, say that VieGarden has not uploaded that information yet.
`.trim();

export async function getFarmKnowledge(): Promise<FarmKnowledge> {
  try {
    const raw = await readFile(knowledgePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<FarmKnowledge>;

    return {
      content: parsed.content?.trim() || defaultKnowledge,
      updatedAt: parsed.updatedAt || null,
    };
  } catch {
    return {
      content: defaultKnowledge,
      updatedAt: null,
    };
  }
}

export async function saveFarmKnowledge(content: string): Promise<FarmKnowledge> {
  const normalized = content.trim();

  if (!normalized) {
    throw new Error("Knowledge content cannot be empty.");
  }

  const payload: FarmKnowledge = {
    content: normalized,
    updatedAt: new Date().toISOString(),
  };

  await mkdir(dataDir, { recursive: true });
  await writeFile(knowledgePath, JSON.stringify(payload, null, 2), "utf8");

  return payload;
}
