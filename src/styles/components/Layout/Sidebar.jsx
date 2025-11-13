import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentSession, clearSession } from '../../utils/storage';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const session = getCurrentSession();

  const menuItems = [
    { icon: '📊', label: 'Главная', path: '/' },
    { icon: '🧾', label: 'Касса', path: '/cash-register' },
    { icon: '📈', label: 'Продажи', path: '/sales' },
    { icon: '💸', label: 'Расходы', path: '/expenses' },
    { icon: '📦', label: 'Товары', path: '/products' },
    { icon: '👥', label: 'Сотрудники', path: '/users' },
    { icon: '📋', label: 'Отчеты', path: '/reports' },
    { icon: '⚙️', label: 'Настройки', path: '/settings' }
  ];

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>AQFinance</h2>
        <div className="user-info">
          <span>{session?.user?.name}</span>
          <small>{session?.user?.role === 'owner' ? 'Владелец' : 
                 session?.user?.role === 'manager' ? 'Управляющий' : 'Кассир'}</small>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          🚪 Выйти
        </button>
      </div>
    </div>
  );
};

export default Sidebar;