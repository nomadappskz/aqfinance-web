export interface User {
  id: string;
  role: 'admin' | 'manager' | 'seller';
  name: string;
  pin: string;
}

export interface SaleItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  paymentType: 'cash' | 'card' | 'mixed';
  cashAmount?: number;
  cardAmount?: number;
  total: number;
  change?: number;
  date: Date;
}

export interface Expense {
  id: string;
  type: 'salary_seller' | 'salary_manager' | 'rent' | 'goods' | 'utilities' | 'safe';
  amount: number;
  description: string;
  date: Date;
}

export interface CompanySettings {
  name: string;
  address: string;
  city: string;
  ip: string;
  sellerPercentage: number;
  managerPercentage: number;
  subscription: boolean;
}