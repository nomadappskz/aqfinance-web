import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentSession } from './utils/storage';

// Layout Components
import Layout from './components/Layout/Layout';
import Sidebar from './components/Layout/Sidebar';

// Auth Components
import Login from './components/Auth/Login';

// Page Components
import Dashboard from './components/Dashboard/Dashboard';
import Sales from './components/Sales/Sales';
import Expenses from './components/Expenses/Expenses';
import Reports from './components/Reports/Reports';
import Settings from './components/Settings/Settings';
import CashRegister from './components/CashRegister/CashRegister';

// Product Management Components
import ProductList from './components/Products/ProductList';

// User Management Components
import UserList from './components/Users/UserList';

// Styles
import './styles/global.css';
import './styles/components/buttons.css';
import './styles/components/forms.css';
import './styles/components/cards.css';
import './styles/components/modals.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const session = getCurrentSession();
  return session ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const session = getCurrentSession();
  return !session ? children : <Navigate to="/" replace />;
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout sidebar={<Sidebar />} />
              </ProtectedRoute>
            }
          >
            {/* Dashboard */}
            <Route index element={<Dashboard />} />
            
            {/* Sales */}
            <Route path="sales" element={<Sales />} />
            
            {/* Expenses */}
            <Route path="expenses" element={<Expenses />} />
            
            {/* Reports */}
            <Route path="reports" element={<Reports />} />
            
            {/* Settings */}
            <Route path="settings" element={<Settings />} />
            
            {/* Cash Register */}
            <Route path="cash-register" element={<CashRegister />} />
            
            {/* Product Management */}
            <Route path="products" element={<ProductList />} />
            
            {/* User Management */}
            <Route path="users" element={<UserList />} />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;