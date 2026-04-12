// Dashboard data constants
export const stats = [
  { label: "Total Orders", value: "4,291", change: "+24.8%", up: true, icon: "📦", desc: "vs last month" },
  { label: "Total Revenue", value: "$187.4K", change: "+31.2%", up: true, icon: "💰", desc: "vs last month" },
  { label: "Active Products", value: "1,384", change: "+9.7%", up: true, icon: "🏷️", desc: "in catalog" },
  { label: "New Customers", value: "9,672", change: "-1.8%", up: false, icon: "👥", desc: "this month" },
];

export const orders = [
  { id: "8924", name: "Sophia Chen", avatar: "SC", product: "Sony WH-1000XM5", date: "Apr 7", amount: 399, status: "Delivered" },
  { id: "8923", name: "Liam Patel", avatar: "LP", product: "MacBook Air M4", date: "Apr 7", amount: 1499, status: "Processing" },
  { id: "8922", name: "Emma Rodriguez", avatar: "ER", product: "Nike Air Force 1", date: "Apr 6", amount: 129, status: "Delivered" },
  { id: "8921", name: "Noah Kim", avatar: "NK", product: 'iPad Pro 13" M4', date: "Apr 6", amount: 1299, status: "Pending" },
  { id: "8920", name: "Olivia Rahman", avatar: "OR", product: "Samsung Galaxy Watch 7", date: "Apr 5", amount: 329, status: "Delivered" },
  { id: "8919", name: "James Thompson", avatar: "JT", product: "Dell UltraSharp Monitor", date: "Apr 5", amount: 649, status: "Cancelled" },
  { id: "8918", name: "Ava Nguyen", avatar: "AN", product: "Logitech MX Master 3S", date: "Apr 4", amount: 99, status: "Delivered" },
  { id: "8917", name: "Mason Davis", avatar: "MD", product: "iPhone 15 Pro", date: "Apr 4", amount: 1199, status: "Processing" },
  { id: "8916", name: "Isabella Garcia", avatar: "IG", product: "Adidas Ultraboost", date: "Apr 3", amount: 189, status: "Delivered" },
  { id: "8915", name: "Ethan Wilson", avatar: "EW", product: "Samsung 4K TV", date: "Apr 3", amount: 899, status: "Pending" },
];

export const categories = [
  { name: "Electronics", count: 528, pct: 38, color: "#6366f1" },
  { name: "Fashion & Apparel", count: 364, pct: 25, color: "#f43f5e" },
  { name: "Home & Kitchen", count: 289, pct: 20, color: "#10b981" },
  { name: "Sports & Outdoors", count: 197, pct: 10, color: "#f59e0b" },
  { name: "Beauty & Health", count: 142, pct: 7, color: "#8b5cf6" },
];

export const topProducts = [
  { name: "MacBook Air M4", category: "Electronics", revenue: "$92.8K", units: 72, icon: "💻", trend: "+19%", up: true },
  { name: "Sony WH-1000XM5", category: "Electronics", revenue: "$67.3K", units: 198, icon: "🎧", trend: "+14%", up: true },
  { name: 'iPad Pro 13" M4', category: "Electronics", revenue: "$54.1K", units: 51, icon: "📱", trend: "+22%", up: true },
  { name: "Nike Air Force 1", category: "Fashion", revenue: "$38.9K", units: 287, icon: "👟", trend: "-2%", up: false },
  { name: "Samsung Galaxy Watch 7", category: "Electronics", revenue: "$31.6K", units: 134, icon: "⌚", trend: "+27%", up: true },
  { name: "Dyson V15 Vacuum", category: "Home & Kitchen", revenue: "$26.4K", units: 68, icon: "🧹", trend: "+11%", up: true },
  { name: "iPhone 15 Pro", category: "Electronics", revenue: "$23.8K", units: 42, icon: "📱", trend: "+31%", up: true },
  { name: "Adidas Ultraboost", category: "Fashion", revenue: "$18.9K", units: 156, icon: "👟", trend: "+8%", up: true },
];

export const topCustomers = [
  { name: "Sophia Chen", email: "sophia.chen@tech.co", spend: "$12,840", orders: 47 },
  { name: "Liam Patel", email: "liam.p@design.io", spend: "$9,250", orders: 34 },
  { name: "Emma Rodriguez", email: "emma.r@gmail.com", spend: "$7,680", orders: 29 },
  { name: "Noah Kim", email: "noah.k@corp.com", spend: "$6,120", orders: 22 },
  { name: "Olivia Rahman", email: "olivia.rahman@live.com", spend: "$5,490", orders: 18 },
  { name: "James Thompson", email: "james.t@freelance.dev", spend: "$4,210", orders: 15 },
  { name: "Ava Nguyen", email: "ava.n@startup.io", spend: "$3,890", orders: 12 },
  { name: "Mason Davis", email: "mason.d@agency.com", spend: "$3,450", orders: 11 },
];

export const tabs = ["All", "Delivered", "Processing", "Pending", "Cancelled"];

export const STATUS_STYLES = {
  Delivered: { bg: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  Processing: { bg: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
  Pending: { bg: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  Cancelled: { bg: "bg-rose-50 text-rose-700", dot: "bg-rose-500" },
};

export const AVATAR_COLORS = [
  "bg-violet-500", "bg-emerald-500", "bg-amber-500",
  "bg-rose-500", "bg-cyan-500", "bg-indigo-500", "bg-violet-400",
];