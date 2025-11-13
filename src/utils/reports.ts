import { storage } from './storage';

export const calculateReports = () => {
  const sales = storage.getSales();
  const expenses = storage.getExpenses();
  const companySettings = storage.getCompanySettings();

  const today = new Date().toDateString();
  const todaySales = sales
    .filter(sale => new Date(sale.date).toDateString() === today)
    .reduce((sum, sale) => sum + sale.total, 0);

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const weekSales = sales
    .filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= startOfWeek && saleDate <= endOfWeek;
    })
    .reduce((sum, sale) => sum + sale.total, 0);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const monthSales = sales
    .filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= startOfMonth && saleDate <= endOfMonth;
    })
    .reduce((sum, sale) => sum + sale.total, 0);

  const sellerSalary = weekSales * (companySettings.sellerPercentage / 100);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netProfit = weekSales - totalExpenses;

  return {
    todaySales,
    weekSales,
    monthSales,
    sellerSalary,
    totalExpenses,
    netProfit,
    cashBalance: storage.getCashBalance()
  };
};