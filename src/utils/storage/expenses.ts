import { Expense } from './storage';
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

export const saveExpense = (expenseData: Omit<Expense, 'id' | 'timestamp'>): Expense => {
  const expenses = getExpenses();
  const expense: Expense = {
    id: Date.now().toString(),
    ...expenseData,
    timestamp: new Date().toISOString()
  };
  
  expenses.push(expense);
  setItem('expenses', expenses);
  updateCashBalance(-expenseData.amount);
  
  return expense;
};

export const getExpenses = (): Expense[] => {
  return getItem('expenses');
};

export const getTodayExpenses = (): Expense[] => {
  const today = new Date().toLocaleDateString('ru-RU');
  return getExpenses().filter(expense => expense.date === today);
};

export const getExpensesByDateRange = (startDate: Date, endDate: Date): Expense[] => {
  const expenses = getExpenses();
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.timestamp);
    return expenseDate >= startDate && expenseDate <= endDate;
  });
};

export const deleteExpense = (id: string): boolean => {
  const expenses = getExpenses();
  const expense = expenses.find(e => e.id === id);
  const filtered = expenses.filter(e => e.id !== id);
  
  setItem('expenses', filtered);
  
  if (expense) {
    updateCashBalance(expense.amount);
  }
  
  return true;
};