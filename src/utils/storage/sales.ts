import { Sale, SaleItem } from './storage';
import { updateCashBalance } from './cash';

const getItem = (key: string, defaultValue: any = []) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '') || defaultValue;
  } catch {
    return defaultValue;
  }
};

const setItem = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const saveSale = (saleData: Omit<Sale, 'id' | 'timestamp' | 'date'>): Sale => {
  const sales = getSales();
  const sale: Sale = {
    id: Date.now().toString(),
    ...saleData,
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString('ru-RU')
  };
  
  sales.push(sale);
  setItem('sales', sales);
  
  if (saleData.paymentMethod === 'cash' || saleData.paymentMethod === 'mixed') {
    updateCashBalance(saleData.cashAmount || 0);
  }
  
  return sale;
};

export const getSales = (): Sale[] => {
  return getItem('sales');
};

export const getTodaySales = (): Sale[] => {
  const today = new Date().toLocaleDateString('ru-RU');
  return getSales().filter(sale => sale.date === today);
};

export const getSalesByDateRange = (startDate: Date, endDate: Date): Sale[] => {
  const sales = getSales();
  return sales.filter(sale => {
    const saleDate = new Date(sale.timestamp);
    return saleDate >= startDate && saleDate <= endDate;
  });
};