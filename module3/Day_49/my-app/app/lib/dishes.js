// lib/dishes.js
export const DISHES = [
  {
    id: "shiro-tegabino",
    name: "Shiro Tegabino",
    category: "Vegan",
    price: 180,
    description: "Rich spiced chickpea flour stew served bubbling hot in a traditional clay pot.",
    image: "/images/shiro.jpg"
  },
  {
    id: "special-kitfo",
    name: "Special Kitfo",
    category: "Meat",
    price: 350,
    description: "Minced lean beef seasoned with mitmita and spiced butter, served with ayib and gomen.",
    image: "/images/kitfo.jpg"
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    category: "Traditional",
    price: 420,
    description: "Slow-cooked chicken drumsticks in rich berbere sauce with boiled eggs.",
    image: "/images/doro.jpg"
  }
];

export async function getDishes() {
  // Simulate database latency
  await new Promise((res) => setTimeout(res, 300));
  return DISHES;
}

export async function getDishById(id) {
  await new Promise((res) => setTimeout(res, 200));
  return DISHES.find((d) => d.id === id) || null;
}