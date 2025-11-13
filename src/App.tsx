import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentSession } from './utils/storage';

// Layout Components
import Layout from './components/Layout/Layout';
import Sidebar from './components/Layout/Sidebar';

// Auth Components
import Login from './components/auth/Login';

// Используем named imports для существующих компонентов
import { Dashboard } from './components/Dashboard';
import { SalesInterface } from './components/sales/SalesInterface';
import { ExpensesManagement } from './components/settings/ExpensesManagement';
import { OwnerSettings } from './components/settings/OwnerSettings';
import { LoginForm } from './components/LoginForm';

// Создадим простые заглушки для недостающих компонентов
const ProductList = () => <div className="page-container"><h1>📦 Товары (скоро)</h1></div>;
const UserList = () => <div className="page-container"><h1>👥 Сотрудники (скоро)</h1></div>;
const Reports = () => <div className="page-container"><h1>📊 Отчеты (скоро)</h1></div>;
const CashRegister = () => <div className="page-container"><h1>🧾 Касса (скоро)</h1></div>;

// Styles
import './styles/global.css';
import './styles/components/buttons.css';
import './styles/components/forms.css';
import './styles/components/cards.css';
import './styles/components/modals.css';
import './styles/components/Layout/Sidebar.css';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = getCurrentSession();
  return session ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const session = getCurrentSession();
  return !session ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout sidebar={<Sidebar />} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="sales" element={<SalesInterface />} />
            <Route path="expenses" element={<ExpensesManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<OwnerSettings />} />
            <Route path="cash-register" element={<CashRegister />} />
            <Route path="products" element={<ProductList />} />
            <Route path="users" element={<UserList />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
