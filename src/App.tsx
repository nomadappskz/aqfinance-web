import React, { useState, useEffect } from 'react';
import { PinLogin } from './components/auth/PinLogin';
import { Dashboard } from './components/Dashboard';
import { SalesInterface } from './components/sales/SalesInterface';
import { SellerReports } from './components/reports/SellerReports';
import { ManagerReports } from './components/reports/ManagerReports';
import { ExpensesManagement } from './components/settings/ExpensesManagement';
import { OwnerSettings } from './components/settings/OwnerSettings';
import { storage } from './utils/storage';
import { User } from './types';
import { calculateReports } from './utils/reports';
import './styles/main.css';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'sales' | 'seller_reports' | 'manager_reports' | 'owner_settings' | 'expenses'>('login');
  const [cashBalance, setCashBalance] = useState(0);

  const handlePinLogin = (role: 'admin' | 'manager' | 'seller') => {
    const users = storage.getUsers();
    const user = users.find(u => u.role === role);
    
    if (user) {
      storage.setCurrentUser(user);
      setCurrentUser(user);
      setCashBalance(storage.getCashBalance());
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    storage.setCurrentUser(null);
    setCurrentUser(null);
    setCurrentView('login');
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as any);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleCashBalanceUpdate = (newBalance: number) => {
    setCashBalance(newBalance);
  };

  const reports = calculateReports();

  useEffect(() => {
    const savedUser = storage.getCurrentUser();
    if (savedUser) {
      setCurrentUser(savedUser);
      setCurrentView('dashboard');
      setCashBalance(storage.getCashBalance());
    }
  }, []);

  if (currentView === 'login') {
    return <PinLogin onLogin={handlePinLogin} />;
  }

  if (!currentUser) return null;

  if (currentView === 'dashboard') {
    return (
      <Dashboard
        user={currentUser}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        cashBalance={cashBalance}
        todaySales={reports.todaySales}
        weekSales={reports.weekSales}
        monthSales={reports.monthSales}
      />
    );
  }

  if (currentView === 'sales') {
    return (
      <SalesInterface
        user={currentUser}
        onLogout={handleLogout}
        onBack={handleBackToDashboard}
        onCashBalanceUpdate={handleCashBalanceUpdate}
      />
    );
  }

  if (currentView === 'seller_reports') {
    return (
      <SellerReports
        user={currentUser}
        onLogout={handleLogout}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentView === 'manager_reports') {
    return (
      <ManagerReports
        user={currentUser}
        onLogout={handleLogout}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentView === 'expenses') {
    return (
      <ExpensesManagement
        user={currentUser}
        onLogout={handleLogout}
        onBack={handleBackToDashboard}
        onCashBalanceUpdate={handleCashBalanceUpdate}
      />
    );
  }

  if (currentView === 'owner_settings') {
    return (
      <OwnerSettings
        user={currentUser}
        onLogout={handleLogout}
        onBack={handleBackToDashboard}
      />
    );
  }

  return null;
}

export default App;