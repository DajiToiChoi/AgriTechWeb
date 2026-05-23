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
Current farm partner: Farm Together.
Location: ÄÃ  Láº¡t, LÃ¢m Äá»“ng.
Website phase: public project introduction, no customer account segmentation yet.

Current available produce at Farm Together:
1. Rau mÃ¹ng tÆ¡i
- Common cooking ideas: canh mÃ¹ng tÆ¡i náº¥u cua, canh mÃ¹ng tÆ¡i tÃ´m khÃ´, canh mÃ¹ng tÆ¡i thá»‹t báº±m.
- Basic components: cháº¥t xÆ¡, vitamin A, vitamin C vÃ  má»™t sá»‘ khoÃ¡ng cháº¥t á»Ÿ má»©c tham kháº£o.
- Storage: bá»c giáº¥y hoáº·c tÃºi thoÃ¡ng, Ä‘á»ƒ ngÄƒn mÃ¡t 2-4Â°C, nÃªn dÃ¹ng trong 1-2 ngÃ y.

2. Rau cáº£i
- Common cooking ideas: rau cáº£i luá»™c, canh cáº£i thá»‹t báº±m, rau cáº£i xÃ o tá»i.
- Basic components: cháº¥t xÆ¡, vitamin C, vitamin K vÃ  folate á»Ÿ má»©c tham kháº£o.
- Storage: giá»¯ lÃ¡ khÃ´, bá»c kÃ­n vá»«a pháº£i, Ä‘á»ƒ ngÄƒn mÃ¡t 2-4Â°C.

3. Äáº­u que
- Common cooking ideas: Ä‘áº­u que xÃ o tá»i, Ä‘áº­u que xÃ o thá»‹t bÃ², Ä‘áº­u que luá»™c cháº¥m kho quáº¹t.
- Basic components: cháº¥t xÆ¡, vitamin C, vitamin K vÃ  má»™t Ã­t Ä‘áº¡m thá»±c váº­t á»Ÿ má»©c tham kháº£o.
- Storage: khÃ´ng rá»­a trÆ°á»›c khi cáº¥t, cho vÃ o tÃºi/há»™p thoÃ¡ng, nÃªn dÃ¹ng trong 2-3 ngÃ y.

Suggested combos:
- Combo canh thanh mÃ¡t: rau mÃ¹ng tÆ¡i + rau cáº£i.
- Combo xÃ o nhanh: rau cáº£i + Ä‘áº­u que.
- Combo gia Ä‘Ã¬nh 4 ngÆ°á»i: mÃ¹ng tÆ¡i náº¥u canh, cáº£i luá»™c, Ä‘áº­u que xÃ o tá»i.

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


