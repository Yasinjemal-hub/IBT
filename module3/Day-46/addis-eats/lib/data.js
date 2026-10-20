/**
 * Mock order data for the Addis Eats dashboard.
 * Each order has: id, customer, neighbourhood, items (array), total (ETB), date, status.
 */

const orders = [
  {
    id: 1,
    customer: "Abebe Kebede",
    neighbourhood: "Bole",
    items: ["Doro Wot", "Injera (3)"],
    total: 450,
    date: "2024-03-10",
    status: "Delivered",
  },
  {
    id: 2,
    customer: "Sara Tesfaye",
    neighbourhood: "Kazanchis",
    items: ["Tibs", "Sprite"],
    total: 320,
    date: "2024-03-10",
    status: "Delivered",
  },
  {
    id: 3,
    customer: "Dawit Haile",
    neighbourhood: "Piassa",
    items: ["Kitfo", "Ayib", "Injera (2)"],
    total: 580,
    date: "2024-03-11",
    status: "Delivered",
  },
  {
    id: 4,
    customer: "Meron Alemu",
    neighbourhood: "Merkato",
    items: ["Shiro Wot", "Injera (4)"],
    total: 260,
    date: "2024-03-11",
    status: "Delivered",
  },
  {
    id: 5,
    customer: "Yonas Girma",
    neighbourhood: "Sarbet",
    items: ["Beyainatu", "Juice"],
    total: 390,
    date: "2024-03-11",
    status: "Cancelled",
  },
  {
    id: 6,
    customer: "Hana Bekele",
    neighbourhood: "Bole",
    items: ["Doro Wot", "Tej"],
    total: 520,
    date: "2024-03-12",
    status: "Delivered",
  },
  {
    id: 7,
    customer: "Fikru Tadesse",
    neighbourhood: "Kazanchis",
    items: ["Kurt", "Injera (2)", "Coffee"],
    total: 670,
    date: "2024-03-12",
    status: "Delivered",
  },
  {
    id: 8,
    customer: "Tigist Mulugeta",
    neighbourhood: "Piassa",
    items: ["Shiro Wot", "Salad"],
    total: 280,
    date: "2024-03-12",
    status: "Pending",
  },
  {
    id: 9,
    customer: "Solomon Worku",
    neighbourhood: "Bole",
    items: ["Tibs", "Injera (3)", "Sprite"],
    total: 410,
    date: "2024-03-13",
    status: "Delivered",
  },
  {
    id: 10,
    customer: "Bethlehem Desta",
    neighbourhood: "Merkato",
    items: ["Beyainatu"],
    total: 180,
    date: "2024-03-13",
    status: "Delivered",
  },
  {
    id: 11,
    customer: "Kedir Mohammed",
    neighbourhood: "Sarbet",
    items: ["Kitfo", "Injera (2)", "Tej"],
    total: 720,
    date: "2024-03-13",
    status: "Delivered",
  },
  {
    id: 12,
    customer: "Rahel Assefa",
    neighbourhood: "Bole",
    items: ["Doro Wot", "Coffee"],
    total: 380,
    date: "2024-03-14",
    status: "Delivered",
  },
  {
    id: 13,
    customer: "Ermias Gebre",
    neighbourhood: "Kazanchis",
    items: ["Tibs", "Kurt", "Injera (4)"],
    total: 590,
    date: "2024-03-14",
    status: "Pending",
  },
  {
    id: 14,
    customer: "Liya Mengistu",
    neighbourhood: "Piassa",
    items: ["Shiro Wot", "Ayib", "Juice"],
    total: 340,
    date: "2024-03-14",
    status: "Delivered",
  },
  {
    id: 15,
    customer: "Biniam Teshome",
    neighbourhood: "Merkato",
    items: ["Beyainatu", "Coffee"],
    total: 230,
    date: "2024-03-15",
    status: "Delivered",
  },
  {
    id: 16,
    customer: "Aida Yilma",
    neighbourhood: "Sarbet",
    items: ["Doro Wot", "Injera (3)"],
    total: 450,
    date: "2024-03-15",
    status: "Delivered",
  },
  {
    id: 17,
    customer: "Nahom Berhane",
    neighbourhood: "Bole",
    items: ["Kitfo", "Tej", "Injera (2)"],
    total: 680,
    date: "2024-03-15",
    status: "Cancelled",
  },
  {
    id: 18,
    customer: "Selam Nega",
    neighbourhood: "Kazanchis",
    items: ["Tibs", "Salad", "Sprite"],
    total: 360,
    date: "2024-03-16",
    status: "Delivered",
  },
  {
    id: 19,
    customer: "Tsegaye Wolde",
    neighbourhood: "Piassa",
    items: ["Doro Wot", "Injera (4)", "Coffee"],
    total: 510,
    date: "2024-03-16",
    status: "Delivered",
  },
  {
    id: 20,
    customer: "Meseret Abate",
    neighbourhood: "Merkato",
    items: ["Shiro Wot", "Juice"],
    total: 240,
    date: "2024-03-16",
    status: "Pending",
  },
];

/**
 * Simulates an async fetch of orders.
 * @returns {Promise<Array>} The list of orders.
 */
export async function getOrders() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return orders;
}

/**
 * Aggregates total revenue by neighbourhood.
 * @param {Array} orderList
 * @returns {Array<{neighbourhood: string, revenue: number}>}
 */
export function getRevenueByNeighbourhood(orderList) {
  const map = {};
  for (const order of orderList) {
    if (!map[order.neighbourhood]) {
      map[order.neighbourhood] = 0;
    }
    map[order.neighbourhood] += order.total;
  }
  return Object.entries(map)
    .map(([neighbourhood, revenue]) => ({ neighbourhood, revenue }))
    .sort((a, b) => b.revenue - a.revenue);
}

/**
 * Groups orders by date and counts them.
 * @param {Array} orderList
 * @returns {Array<{date: string, orders: number}>}
 */
export function getOrdersOverTime(orderList) {
  const map = {};
  for (const order of orderList) {
    if (!map[order.date]) {
      map[order.date] = 0;
    }
    map[order.date]++;
  }
  return Object.entries(map)
    .map(([date, orders]) => ({ date, orders }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Formats a number as Ethiopian Birr.
 * @param {number} amount
 * @returns {string}
 */
export function formatETB(amount) {
  return `ETB ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
