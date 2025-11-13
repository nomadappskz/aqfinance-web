import { DailyReport, PeriodReport } from './types';

// Временные функции чтобы избежать циклического импорта
const getTodaySales = () => {
  const sales = getItem('sales');
  const today = new Date().toLocaleDateString('ru-RU');
  return sales.filter((sale: any) => sale.date === today);
};

const getTodayExpenses = () => {
  const expenses = getItem('expenses');
  const today = new Date().toLocaleDateString('ru-RU');
  return expenses.filter((expense: any) => expense.date === today);
};

const getSalesByDateRange = (startDate: Date, endDate: Date) => {
  const sales = getItem('sales');
  return sales.filter((sale: any) => {
    const saleDate = new Date(sale.timestamp);
    return saleDate >= startDate && saleDate <= endDate;
  });
};

const getExpensesByDateRange = (startDate: Date, endDate: Date) => {
  const expenses = getItem('expenses');
  return expenses.filter((expense: any) => {
    const expenseDate = new Date(expense.timestamp);
    return expenseDate >= startDate && expenseDate <= endDate;
  });
};

// Базовые утилиты
const getItem = (key: string, defaultValue: any = []) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '') || defaultValue;
  } catch {
    return defaultValue;
  }
};

const getCashBalance = (): number => {
  const balance = localStorage.getItem('cashBalance');
  return balance ? parseFloat(balance) : 0;
};

export const getDailyReport = (): DailyReport => {
  const todaySales = getTodaySales();
  const todayExpenses = getTodayExpenses();
  
  const totalSales = todaySales.reduce((sum: number, sale: any) => sum + sale.total, 0);
  const totalExpenses = todayExpenses.reduce((sum: number, exp: any) => sum + exp.amount, 0);
  const netProfit = totalSales - totalExpenses;
  
  const paymentStats = todaySales.reduce((stats: Record<string, number>, sale: any) => {
    stats[sale.paymentMethod] = (stats[sale.paymentMethod] || 0) + sale.total;
    return stats;
  }, {});

  return {
    date: new Date().toLocaleDateString('ru-RU'),
    totalSales,
    totalExpenses, 
    netProfit,
    salesCount: todaySales.length,
    expensesCount: todayExpenses.length,
    cashBalance: getCashBalance(),
    paymentStats
  };
};

export const getPeriodReport = (startDate: Date, endDate: Date): PeriodReport => {
  const sales = getSalesByDateRange(startDate, endDate);
  const expenses = getExpensesByDateRange(startDate, endDate);
  
  const totalSales = sales.reduce((sum: number, sale: any) => sum + sale.total, 0);
  const totalExpenses = expenses.reduce((sum: number, exp: any) => sum + exp.amount, 0);
  const netProfit = totalSales - totalExpenses;

  const dailyBreakdown: Record<string, { sales: number; expenses: number; profit: number }> = {};
  
  sales.forEach((sale: any) => {
    const date = sale.date;
    if (!dailyBreakdown[date]) {
      dailyBreakdown[date] = { sales: 0, expenses: 0, profit: 0 };
    }
    dailyBreakdown[date].sales += sale.total;
    dailyBreakdown[date].profit += sale.total;
  });

  expenses.forEach((expense: any) => {
    const date = expense.date;
    if (!dailyBreakdown[date]) {
      dailyBreakdown[date] = { sales: 0, expenses: 0, profit: 0 };
    }
    dailyBreakdown[date].expenses += expense.amount;
    dailyBreakdown[date].profit -= expense.amount;
  });

  return {
    period: { startDate, endDate },
    summary: {
      totalSales,
      totalExpenses,
      netProfit,
      salesCount: sales.length,
      expensesCount: expenses.length
    },
    dailyBreakdown
  };
};