import { User, Sale, Expense, CompanySettings } from '../types';

export const storage = {
  getUsers: (): User[] => {
    const defaultUsers: User[] = [
      { id: '1', pin: '1122', role: 'admin', name: 'Admin' },
      { id: '2', pin: '1111', role: 'manager', name: 'Менеджер' },
      { id: '3', pin: '0000', role: 'seller', name: 'Кассир' }
    ];
    const stored = localStorage.getItem('aqfinance_users');
    return stored ? JSON.parse(stored) : defaultUsers;
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem('aqfinance_current_user');
    return stored ? JSON.parse(stored) : null;
  },
  
  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem('aqfinance_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aqfinance_current_user');
    }
  },

  getSales: (): Sale[] => {
    const stored = localStorage.getItem('aqfinance_sales');
    return stored ? JSON.parse(stored) : [];
  },
  
  saveSales: (sales: Sale[]) => {
    localStorage.setItem('aqfinance_sales', JSON.stringify(sales));
  },

  getExpenses: (): Expense[] => {
    const stored = localStorage.getItem('aqfinance_expenses');
    return stored ? JSON.parse(stored) : [];
  },

  saveExpenses: (expenses: Expense[]) => {
    localStorage.setItem('aqfinance_expenses', JSON.stringify(expenses));
  },

  getCompanySettings: (): CompanySettings => {
    const defaultSettings: CompanySettings = {
      name: 'AQ Finance',
      address: '',
      city: 'Усть-Каменогорск',
      ip: '',
      sellerPercentage: 13,
      managerPercentage: 15,
      subscription: true
    };
    const stored = localStorage.getItem('aqfinance_company_settings');
    return stored ? JSON.parse(stored) : defaultSettings;
  },

  saveCompanySettings: (settings: CompanySettings) => {
    localStorage.setItem('aqfinance_company_settings', JSON.stringify(settings));
  },

  getCashBalance: (): number => {
    const stored = localStorage.getItem('aqfinance_cash_balance');
    return stored ? parseFloat(stored) : 0;
  },

  saveCashBalance: (balance: number) => {
    localStorage.setItem('aqfinance_cash_balance', balance.toString());
  },

  clearData: () => {
    localStorage.removeItem('aqfinance_sales');
    localStorage.removeItem('aqfinance_expenses');
    localStorage.setItem('aqfinance_cash_balance', '0');
  }
};