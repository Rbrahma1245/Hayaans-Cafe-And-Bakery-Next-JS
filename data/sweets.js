// Add your own sweets here. Each one needs: id, name, category, price, description.
// Optional: image (put the file in /public/images and use "/images/yourfile.jpg"),
// emoji (shown when there is no image), tint (background colour of the tile),
// details (longer text for the detail page),
// sizes (several prices on the detail page), for example:
//   sizes: [{ label: "Box of 6", price: 250 }, { label: "Box of 12", price: 450 }]
export const categories = ["All", "Boxes", "Cakes", "Pastries", "Cookies", "Cold treats"];

export const sweets = [
  { id: 0, name: "Butter Crunch", category: "Boxes", image: "/images/butter-crunch.png", tint: "#E4F1F0",
    description: "Buttery crunchy squares topped with roasted almonds, packed in a gift box." },
  { id: 1, name: "Chocolate Truffle Cake", category: "Cakes", price: 220, emoji: "🍰", tint: "#E8C7CC",
    description: "Dark chocolate sponge layered with silky ganache." },
  { id: 2, name: "Butter Croissant", category: "Pastries", price: 120, emoji: "🥐", tint: "#FFE7A8",
    description: "Flaky, golden and baked fresh every morning." },
  { id: 3, name: "Blueberry Muffin", category: "Pastries", price: 110, emoji: "🧁", tint: "#D9D4F0",
    description: "Soft crumb packed with juicy blueberries." },
  { id: 4, name: "Choco Chip Cookie", category: "Cookies", price: 80, emoji: "🍪", tint: "#F3D9B8",
    description: "Crisp edges, gooey centre, big chocolate chunks." },
  { id: 5, name: "Gulab Jamun Tart", category: "Pastries", price: 150, emoji: "🥧", tint: "#F6C9A9",
    description: "A buttery tart shell with warm rose-syrup jamun." },
  { id: 6, name: "Strawberry Donut", category: "Pastries", price: 90, emoji: "🍩", tint: "#F9CBD6",
    description: "Pillowy donut with a pink strawberry glaze." },
  { id: 7, name: "Vanilla Ice Cream", category: "Cold treats", price: 100, emoji: "🍨", tint: "#FFF1C9",
    description: "Slow-churned with real vanilla bean." },
  { id: 8, name: "Pistachio Brownie", category: "Cakes", price: 130, emoji: "🍫", tint: "#CFE3C4",
    description: "Fudgy brownie topped with crushed pistachios." },
];
