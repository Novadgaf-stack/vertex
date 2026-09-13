import { Customer, MetricData, Product, RevenueDataPoint, Transaction, UserGrowthDataPoint } from '../types';

export const mockMetrics: MetricData[] = [
  { title: "Total Revenue", value: "$124,563.00", change: 12.5, trend: "up", description: "Compared to last month" },
  { title: "Active Users", value: "8,234", change: 5.2, trend: "up", description: "Compared to last month" },
  { title: "New Customers", value: "432", change: -1.2, trend: "down", description: "Compared to last month" },
  { title: "Conversion Rate", value: "3.24%", change: 0.4, trend: "up", description: "Compared to last month" }
];

export const mockRevenueData: RevenueDataPoint[] = [
  { date: "Jan", revenue: 45000, target: 40000 },
  { date: "Feb", revenue: 52000, target: 45000 },
  { date: "Mar", revenue: 48000, target: 50000 },
  { date: "Apr", revenue: 61000, target: 55000 },
  { date: "May", revenue: 65000, target: 60000 },
  { date: "Jun", revenue: 72000, target: 65000 },
  { date: "Jul", revenue: 84000, target: 70000 },
  { date: "Aug", revenue: 89000, target: 75000 },
  { date: "Sep", revenue: 95000, target: 80000 },
  { date: "Oct", revenue: 102000, target: 85000 },
  { date: "Nov", revenue: 115000, target: 95000 },
  { date: "Dec", revenue: 124563, target: 105000 }
];

export const mockUserGrowthData: UserGrowthDataPoint[] = [
  { month: "Jan", users: 2100, activeUsers: 1800 },
  { month: "Feb", users: 2800, activeUsers: 2200 },
  { month: "Mar", users: 3400, activeUsers: 2700 },
  { month: "Apr", users: 4100, activeUsers: 3300 },
  { month: "May", users: 4900, activeUsers: 3900 },
  { month: "Jun", users: 5800, activeUsers: 4600 },
  { month: "Jul", users: 6700, activeUsers: 5400 },
  { month: "Aug", users: 7400, activeUsers: 6100 },
  { month: "Sep", users: 8234, activeUsers: 6800 }
];

export const mockTransactions: Transaction[] = [
  { id: "TRX-00129", customerId: "C-092", customerName: "Acme Corp", amount: 499.00, status: "completed", paymentMethod: "Credit Card", date: "2024-05-12T14:22:00Z" },
  { id: "TRX-00130", customerId: "C-143", customerName: "Globex Inc", amount: 1299.00, status: "completed", paymentMethod: "Wire Transfer", date: "2024-05-12T11:05:00Z" },
  { id: "TRX-00131", customerId: "C-021", customerName: "Initech", amount: 49.00, status: "pending", paymentMethod: "PayPal", date: "2024-05-11T09:41:00Z" },
  { id: "TRX-00132", customerId: "C-118", customerName: "Soylent Corp", amount: 249.50, status: "completed", paymentMethod: "Credit Card", date: "2024-05-11T16:33:00Z" },
  { id: "TRX-00133", customerId: "C-087", customerName: "Umbrella Corp", amount: 99.00, status: "failed", paymentMethod: "Credit Card", date: "2024-05-10T08:12:00Z" }
];

export const mockCustomers: Customer[] = [
  { id: "C-092", name: "Olivia Martin", email: "olivia.m@acmecorp.com", avatar: "OM", status: "active", plan: "Enterprise", revenue: 5988.00, lastActivity: "2 hours ago" },
  { id: "C-143", name: "Jackson Lee", email: "jlee@globex.inc", avatar: "JL", status: "active", plan: "Pro", revenue: 2388.00, lastActivity: "5 hours ago" },
  { id: "C-021", name: "Isabella Nguyen", email: "inguyen@initech.co", avatar: "IN", status: "inactive", plan: "Basic", revenue: 588.00, lastActivity: "3 days ago" },
  { id: "C-118", name: "William Chen", email: "w.chen@soylent.org", avatar: "WC", status: "active", plan: "Pro", revenue: 1494.00, lastActivity: "1 hour ago" },
  { id: "C-087", name: "Sophia Martinez", email: "smartinez@umbrella.net", avatar: "SM", status: "churned", plan: "Basic", revenue: 294.00, lastActivity: "2 months ago" },
  { id: "C-055", name: "Ethan Wright", email: "ewright@stark.com", avatar: "EW", status: "active", plan: "Enterprise", revenue: 11976.00, lastActivity: "10 mins ago" },
  { id: "C-201", name: "Ava Taylor", email: "ava.t@wayne.ent", avatar: "AT", status: "active", plan: "Pro", revenue: 3582.00, lastActivity: "1 day ago" }
];

export const mockProducts: Product[] = [
  { id: "P-001", name: "Analytics Dashboard Pro", category: "Software", price: 99.00, sales: 1245, revenue: 123255.00, status: "in_stock" },
  { id: "P-002", name: "Cloud Storage 1TB", category: "Infrastructure", price: 15.00, sales: 8432, revenue: 126480.00, status: "in_stock" },
  { id: "P-003", name: "API Access (Enterprise)", category: "Service", price: 499.00, sales: 124, revenue: 61876.00, status: "in_stock" },
  { id: "P-004", name: "Dedicated Support SLA", category: "Service", price: 299.00, sales: 85, revenue: 25415.00, status: "low_stock" },
  { id: "P-005", name: "Legacy System Integrator", category: "Software", price: 199.00, sales: 32, revenue: 6368.00, status: "out_of_stock" }
];
