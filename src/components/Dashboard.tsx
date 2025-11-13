import React from 'react';
import { User } from '../types';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  cashBalance: number;
  todaySales: number;
  weekSales: number;
  monthSales: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  onLogout,
  onNavigate,
  cashBalance,
  todaySales,
  weekSales,
  monthSales
}) => {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>AQFinance</h1>
          <div className="user-info">
            <span>{user.name}</span>
            <button onClick={onLogout} className="logout-btn">Выйти</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="shift-container">
          <h2>Кассовая смена</h2>
          
          <div className="cash-balance">
            <div className="balance-amount">💰 Касса: {cashBalance.toLocaleString()} ₸</div>
            <button 
              onClick={() => onNavigate('sales')}
              className="primary-btn"
            >
              ✅ Подтвердить и открыть смену
            </button>
          </div>

          <div className="shift-actions">
            {user.role === 'seller' && (
              <>
                <button onClick={() => onNavigate('sales')} className="primary-btn">💰 Касса продаж</button>
                <button onClick={() => onNavigate('seller_reports')} className="secondary-btn">📊 Моя статистика</button>
              </>
            )}

            {user.role === 'manager' && (
              <>
                <button onClick={() => onNavigate('sales')} className="primary-btn">💰 Касса продаж</button>
                <button onClick={() => onNavigate('manager_reports')} className="secondary-btn">📈 Отчеты управления</button>
                <button onClick={() => onNavigate('expenses')} className="secondary-btn">💼 Управление расходами</button>
              </>
            )}

            {user.role === 'admin' && (
              <>
                <button onClick={() => onNavigate('sales')} className="primary-btn">💰 Касса продаж</button>
                <button onClick={() => onNavigate('manager_reports')} className="secondary-btn">📈 Все отчеты</button>
                <button onClick={() => onNavigate('owner_settings')} className="secondary-btn">⚙️ Настройки компании</button>
                <button onClick={() => onNavigate('expenses')} className="secondary-btn">💼 Расходы</button>
              </>
            )}
          </div>

          <div className="department-stats">
            <h3>📈 Выручка отдела</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">Сегодня</div>
                <div className="stat-value">{todaySales.toLocaleString()} ₸</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Неделя (Пн-Вс)</div>
                <div className="stat-value">{weekSales.toLocaleString()} ₸</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Месяц</div>
                <div className="stat-value">{monthSales.toLocaleString()} ₸</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};