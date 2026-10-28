// lib/dishes.js

export const MOCK_DISHES = [
  {
    id: "shiro-tegabino",
    name: "Shiro Tegabino",
    category: "Vegan",
    price: 180,
    description: "Rich spiced chickpea flour stew served bubbling hot in a traditional clay pot with fresh injera.",
    isAvailable: true,
  },
  {
    id: "special-kitfo",
    name: "Special Kitfo",
    category: "Meat",
    price: 350,
    description: "Minced lean beef seasoned with mitmita and spiced butter (niter kibbeh), served with ayib and gomen.",
    isAvailable: true,
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    category: "Traditional",
    price: 420,
    description: "Slow-cooked chicken drumsticks in rich berbere sauce, served with boiled eggs and cottage cheese.",
    isAvailable: true,
  },
   {
    id: "doro-wat",
    name: "Doro Wat",
    category: "Traditional",
    price: 420,
    description: "Slow-cooked chicken drumsticks in rich berbere sauce, served with boiled eggs and cottage cheese.",
    isAvailable: true,
  },
   {
    id: "doro-wat",
    name: "Doro Wat",
    category: "Traditional",
    price: 420,
    description: "Slow-cooked chicken drumsticks in rich berbere sauce, served with boiled eggs and cottage cheese.",
    isAvailable: true,
  },
  {
    id: "yetsom-beyaynetu",
    name: "Yetsom Beyaynetu",
    category: "Vegan",
    price: 220,
    description: "Combination platter of yellow split peas, red lentils, collard greens, cabbage, and beetroot on injera.",
    isAvailable: true,
  },
  {
    id: "yetsom-beyaynetu",
    name: "Yetsom Beyaynetu",
    category: "Vegan",
    price: 220,
    description: "Combination platter of yellow split peas, red lentils, collard greens, cabbage, and beetroot on injera.",
    isAvailable: true,
  },{
    id: "yetsom-beyaynetu",
    name: "Yetsom Beyaynetu",
    category: "Vegan",
    price: 220,
    description: "Combination platter of yellow split peas, red lentils, collard greens, cabbage, and beetroot on injera.",
    isAvailable: true,
  }
];

// Simulated async database/API fetch function with artificial delay
export async function getDishes() {
  // Simulate 1 second network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return MOCK_DISHES;
}