import { Sale, Expense } from './storage';
import { getSalesByDateRange, getTodaySales, getTodayExpenses, getExpensesByDateRange, getCashBalance } from './storage';

interface DailyReport {
  date: string;
  totalSales: number;
  totalExpenses: number;
  netProfit: number;
  salesCount: number;
  expensesCount: number;
  cashBalance: number;
  paymentStats: Record<string, number>;
}

interface PeriodReport {
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

export const getDailyReport = (): DailyReport => {
  const todaySales = getTodaySales();
  const todayExpenses = getTodayExpenses();
  
  const totalSales = todaySales.reduce((sum, sale) => sum + sale.total, 0);
  const totalExpenses = todayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const netProfit = totalSales - totalExpenses;
  
  const paymentStats = todaySales.reduce((stats: Record<string, number>, sale) => {
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
  
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const netProfit = totalSales - totalExpenses;

  const dailyBreakdown: Record<string, { sales: number; expenses: number; profit: number }> = {};
  
  sales.forEach(sale => {
    const date = sale.date;
    if (!dailyBreakdown[date]) {
      dailyBreakdown[date] = { sales: 0, expenses: 0, profit: 0 };
    }
    dailyBreakdown[date].sales += sale.total;
    dailyBreakdown[date].profit += sale.total;
  });

  expenses.forEach(expense => {
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