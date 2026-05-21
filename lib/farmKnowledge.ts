import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const knowledgePath = path.join(dataDir, "farm-knowledge.json");

export type FarmKnowledge = {
  content: string;
  updatedAt: string | null;
};

const defaultKnowledge = `
VieGarden project data.
Current farm partner: Farm Anh Đạt.
Location: Đà Lạt, Lâm Đồng.
Website phase: public project introduction, no customer account segmentation yet.

Current available produce at Farm Anh Đạt:
1. Rau mùng tơi
- Common cooking ideas: canh mùng tơi nấu cua, canh mùng tơi tôm khô, canh mùng tơi thịt bằm.
- Basic components: chất xơ, vitamin A, vitamin C và một số khoáng chất ở mức tham khảo.
- Storage: bọc giấy hoặc túi thoáng, để ngăn mát 2-4°C, nên dùng trong 1-2 ngày.

2. Rau cải
- Common cooking ideas: rau cải luộc, canh cải thịt bằm, rau cải xào tỏi.
- Basic components: chất xơ, vitamin C, vitamin K và folate ở mức tham khảo.
- Storage: giữ lá khô, bọc kín vừa phải, để ngăn mát 2-4°C.

3. Đậu que
- Common cooking ideas: đậu que xào tỏi, đậu que xào thịt bò, đậu que luộc chấm kho quẹt.
- Basic components: chất xơ, vitamin C, vitamin K và một ít đạm thực vật ở mức tham khảo.
- Storage: không rửa trước khi cất, cho vào túi/hộp thoáng, nên dùng trong 2-3 ngày.

Suggested combos:
- Combo canh thanh mát: rau mùng tơi + rau cải.
- Combo xào nhanh: rau cải + đậu que.
- Combo gia đình 4 người: mùng tơi nấu canh, cải luộc, đậu que xào tỏi.

Customer answer policy:
- Suggest combos, storage, preparation, cooking ideas and basic components only.
- Do not provide deep nutrition, medical claims, disease treatment or therapeutic meal plans.
- If a question asks about inventory, price, harvest date, certification or batch status and the uploaded data does not include it, say VieGarden has not uploaded that information yet.
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
