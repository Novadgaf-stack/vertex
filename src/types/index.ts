export interface MetricData {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'active' | 'inactive' | 'churned';
  plan: 'Basic' | 'Pro' | 'Enterprise';
  revenue: number;
  lastActivity: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sales: number;
  revenue: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  target: number;
}

export interface UserGrowthDataPoint {
  month: string;
  users: number;
  activeUsers: number;
}
