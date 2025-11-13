import React from 'react';
import { User } from '../../types';
import { calculateReports } from '../../utils/reports';
import { storage } from '../../utils/storage';

interface ManagerReportsProps {
  user: User;
  onLogout: () => void;
  onBack: () => void;
}

export const ManagerReports: React.FC<ManagerReportsProps> = ({
  user,
  onLogout,
  onBack
}) => {
  const reports = calculateReports();
  const expenses = storage.getExpenses();
  const companySettings = storage.getCompanySettings();

  const goodsExpenses = expenses.filter(e => e.type === 'goods').reduce((sum, e) => sum + e.amount, 0);
  const salaryExpenses = expenses.filter(e => e.type.includes('salary')).reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <button onClick={onBack} className="back-btn">← Назад</button>
          <h1>Отчеты управления</h1>
          <div className="user-info">
            <span>{user.name}</span>
            <button onClick={onLogout} className="logout-btn">Выйти</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="reports-container">
          <div className="report-section">
            <h3>💰 Финансы отдела</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-title">Общая выручка</div>
                <div className="stat-value primary">{reports.weekSales.toLocaleString()} ₸</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Расходы на товар</div>
                <div className="stat-value warning">{goodsExpenses.toLocaleString()} ₸</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">ЗП сотрудников</div>
                <div className="stat-value info">{salaryExpenses.toLocaleString()} ₸</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Все расходы</div>
                <div className="stat-value warning">{reports.totalExpenses.toLocaleString()} ₸</div>
              </div>
              <div className="stat-card success">
                <div className="stat-title">Чистая прибыль</div>
                <div className="stat-value">{reports.netProfit.toLocaleString()} ₸</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Сравнение с прошлой неделей</div>
                <div className="stat-value success">+15%</div>
              </div>
            </div>
          </div>

          <div className="report-section">
            <h3>📊 Детализация расходов</h3>
            <div className="expenses-breakdown">
              {expenses.length === 0 ? (
                <p>Нет расходов за текущий период</p>
              ) : (
                expenses.map(expense => (
                  <div key={expense.id} className="expense-detail">
                    <div className="expense-info">
                      <span className="expense-type">{getExpenseTypeLabel(expense.type)}</span>
                      <span className="expense-amount">-{expense.amount.toLocaleString()} ₸</span>
                    </div>
                    <div className="expense-description">{expense.description}</div>
                    <div className="expense-date">{new Date(expense.date).toLocaleDateString()}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const getExpenseTypeLabel = (type: string) => {
  const types = {
    salary_seller: 'ЗП продавца',
    salary_manager: 'ЗП управляющего',
    rent: 'Аренда',
    goods: 'Товар',
    utilities: 'Коммунальные',
    safe: 'Сейф'
  };
  return types[type as keyof typeof types] || type;
};