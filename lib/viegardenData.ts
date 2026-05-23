export const farmImages = {
  hero:
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1800&q=85",
  greenhouse:
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=85",
  fields:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
  produce:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85",
  strawberry:
    "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1400&q=85",
};

export const farmProducts = [
  {
    name: "Rau mùng tơi",
    description: "Rau lá xanh mềm, hợp nấu canh cua, canh tôm hoặc canh thịt bằm.",
    basicComponents: "Chất xơ, vitamin A, vitamin C và một số khoáng chất ở mức tham khảo.",
    cookingIdeas: ["Canh mùng tơi nấu cua", "Canh mùng tơi tôm khô", "Mùng tơi nấu thịt bằm"],
    storage: "Bọc giấy hoặc túi thoáng, bảo quản ngăn mát 2-4°C và dùng trong 1-2 ngày.",
  },
  {
    name: "Rau cải",
    description: "Rau xanh dễ chế biến, vị thanh, hợp món canh, luộc hoặc xào nhẹ.",
    basicComponents: "Chất xơ, vitamin C, vitamin K và folate ở mức tham khảo.",
    cookingIdeas: ["Rau cải luộc", "Canh cải thịt bằm", "Rau cải xào tỏi"],
    storage: "Giữ khô phần lá, bọc kín vừa phải và bảo quản ngăn mát 2-4°C.",
  },
  {
    name: "Đậu que",
    description: "Đậu non giòn, hợp xào, luộc hoặc phối cùng thịt, trứng và nấm.",
    basicComponents: "Chất xơ, vitamin C, vitamin K và một ít đạm thực vật ở mức tham khảo.",
    cookingIdeas: ["Đậu que xào tỏi", "Đậu que xào thịt bò", "Đậu que luộc chấm kho quẹt"],
    storage: "Không rửa trước khi cất, cho vào túi/hộp thoáng và dùng trong 2-3 ngày.",
  },
];

export const featuredFarms = [
  {
    name: "Farm Together",
    location: "Đông Anh, Hà Nội",
    type: "Hữu cơ",
    description:
      "Đối tác farm hiện tại của VieGarden, đang có rau mùng tơi, rau cải và đậu que. Website tập trung giới thiệu câu chuyện hợp tác, sản phẩm theo mùa và trải nghiệm nông trại minh bạch.",
    image: farmImages.strawberry,
    badge: "Đối tác chính",
  },
];

export const quickPrompts = [
  "Gợi ý combo mùng tơi, rau cải, đậu que",
  "Rau mùng tơi chế biến món gì?",
  "Cách bảo quản rau cải và đậu que",
  "Các loại rau này có chất xơ gì?",
];
