import React, { useState } from 'react';
import { User, CompanySettings } from '../../types';
import { storage } from '../../utils/storage';

interface OwnerSettingsProps {
  user: User;
  onLogout: () => void;
  onBack: () => void;
}

export const OwnerSettings: React.FC<OwnerSettingsProps> = ({
  user,
  onLogout,
  onBack
}) => {
  const [companySettings, setCompanySettings] = useState<CompanySettings>(storage.getCompanySettings());

  const handleSaveSettings = () => {
    storage.saveCompanySettings(companySettings);
    alert('Настройки сохранены!');
  };

  const clearData = () => {
    if (window.confirm('Очистить всю историю продаж и расходов?')) {
      storage.clearData();
      alert('Данные очищены!');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <button onClick={onBack} className="back-btn">← Назад</button>
          <h1>Настройки компании</h1>
          <div className="user-info">
            <span>{user.name}</span>
            <button onClick={onLogout} className="logout-btn">Выйти</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="settings-container">
          <div className="settings-section">
            <h3>⚙️ Общие настройки</h3>
            <div className="form-grid">
              <div className="input-group">
                <label>Название компании</label>
                <input
                  type="text"
                  value={companySettings.name}
                  onChange={(e) => setCompanySettings({...companySettings, name: e.target.value})}
                  placeholder="Название компании"
                />
              </div>
              <div className="input-group">
                <label>Адрес</label>
                <input
                  type="text"
                  value={companySettings.address}
                  onChange={(e) => setCompanySettings({...companySettings, address: e.target.value})}
                  placeholder="Адрес"
                />
              </div>
              <div className="input-group">
                <label>Город</label>
                <select 
                  value={companySettings.city}
                  onChange={(e) => setCompanySettings({...companySettings, city: e.target.value})}
                >
                  <option value="Усть-Каменогорск">Усть-Каменогорск (13%)</option>
                  <option value="Алматы">Алматы (10%)</option>
                </select>
              </div>
              <div className="input-group">
                <label>ИП</label>
                <input
                  type="text"
                  value={companySettings.ip}
                  onChange={(e) => setCompanySettings({...companySettings, ip: e.target.value})}
                  placeholder="ИП"
                />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>👥 Настройка ЗП %</h3>
            <div className="form-grid">
              <div className="input-group">
                <label>Продавец (%)</label>
                <input
                  type="number"
                  value={companySettings.sellerPercentage}
                  onChange={(e) => setCompanySettings({...companySettings, sellerPercentage: parseInt(e.target.value)})}
                />
              </div>
              <div className="input-group">
                <label>Управляющий (%)</label>
                <input
                  type="number"
                  value={companySettings.managerPercentage}
                  onChange={(e) => setCompanySettings({...companySettings, managerPercentage: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>💳 Управление подпиской</h3>
            <div className="subscription-setting">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={companySettings.subscription}
                  onChange={(e) => setCompanySettings({...companySettings, subscription: e.target.checked})}
                />
                <span className="checkmark"></span>
                Месячная подписка - 1000 тенге/месяц
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>🔧 Администрирование</h3>
            <div className="admin-actions">
              <button onClick={clearData} className="danger-btn">
                🗑️ Очистить историю
              </button>
              <button className="secondary-btn">
                📤 Экспорт данных
              </button>
            </div>
          </div>

          <button onClick={handleSaveSettings} className="primary-btn">
            💾 Сохранить все настройки
          </button>
        </div>
      </main>
    </div>
  );
};