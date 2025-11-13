// Все типы данных в одном месте
export interface User {
  username: string;
  password: string;
  role: 'owner' | 'manager' | 'cashier';
  name: string;
  createdAt: string;
}

export interface SaleItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  paymentMethod: 'cash' | 'card' | 'mixed';
  cashAmount: number;
  cardAmount: number;
  change: number;
  seller: string;
  timestamp: string;
  date: string;
  delivery?: {
    client: string;
    platform: string;
    address?: string;
    phone?: string;
    type: string;
    status?: 'new' | 'sent' | 'delivered';
  };
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdBy: string;
  timestamp: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
}

export interface CompanySettings {
  name: string;
  currency: string;
  address: string;
  phone: string;
  email: string;
}

export interface Session {
  user: {
    username: string;
    role: string;
    name: string;
  };
  loggedInAt: string;
}

export interface DailyReport {
  date: string;
  totalSales: number;
  totalExpenses: number;
  netProfit: number;
  salesCount: number;
  expensesCount: number;
  cashBalance: number;
  paymentStats: Record<string, number>;
}

export interface PeriodReport {
  period: { startDate: Date; endDate: Date };
  summary: {
    totalSales: number;
    totalExpenses: number;
    netProfit: number;
    salesCount: number;
    expensesCount: number;
  };
  dailyBreakdown: Record<string, { sales: number; expenses: number; profit: number }>;
}