import React from 'react';
import { User } from '../../types';
import { calculateReports } from '../../utils/reports';
import { storage } from '../../utils/storage';

interface SellerReportsProps {
  user: User;
  onLogout: () => void;
  onBack: () => void;
}

export const SellerReports: React.FC<SellerReportsProps> = ({
  user,
  onLogout,
  onBack
}) => {
  const reports = calculateReports();
  const companySettings = storage.getCompanySettings();

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <button onClick={onBack} className="back-btn">← Назад</button>
          <h1>Моя статистика</h1>
          <div className="user-info">
            <span>{user.name}</span>
            <button onClick={onLogout} className="logout-btn">Выйти</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="reports-container">
          <div className="report-section">
            <h3>📊 Личная статистика</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-title">Выручка сегодня</div>
                <div className="stat-value primary">{reports.todaySales.toLocaleString()} ₸</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">ЗП за неделю (Пн-Вс)</div>
                <div className="stat-value success">{reports.sellerSalary.toLocaleString()} ₸</div>
                <div className="stat-subtitle">{companySettings.sellerPercentage}% от продаж</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Выручка отдела</div>
                <div className="stat-value info">{reports.weekSales.toLocaleString()} ₸</div>
              </div>
            </div>
          </div>

          <div className="report-section">
            <h3>📅 Периодические отчеты</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-title">Неделя</div>
                <div className="stat-value">{reports.weekSales.toLocaleString()} ₸</div>
                <div className="stat-trend">📈</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Месяц</div>
                <div className="stat-value">{reports.monthSales.toLocaleString()} ₸</div>
                <div className="stat-trend">📊</div>
              </div>
            </div>
          </div>

          <div className="report-section">
            <h3>💳 Типы оплат</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-title">Наличные</div>
                <div className="stat-value">{reports.cashBalance.toLocaleString()} ₸</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Безнал</div>
                <div className="stat-value">{(reports.weekSales - reports.cashBalance).toLocaleString()} ₸</div>
              </div>
              <div className="stat-card error">
                <div className="stat-title">Возвраты</div>
                <div className="stat-value">0 ₸</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};