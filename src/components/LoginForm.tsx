import React, { useState } from 'react';
import type { User } from '../types';
import { users, testAccounts } from '../data/users';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [login, setLogin] = useState('kassiri');
  const [password, setPassword] = useState('123123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = users.find(u => u.login === login && u.password === password);
    
    if (user) {
      onLogin(user);
    } else {
      setError('Неверный логин или пароль');
    }
  };

  const fillTestCredentials = (testLogin: string, testPassword: string) => {
    setLogin(testLogin);
    setPassword(testPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <h1>AQFinance</h1>
          <p>Система управления продажами</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Логин</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="kassiri"
              required
            />
          </div>

          <div className="input-group">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="login-btn">
            Войти в систему
          </button>
        </form>

        <div className="demo-accounts">
          <p>Тестовые аккаунты:</p>
          {testAccounts.map((account, index) => (
            <div key={index}>
              {account.role}: {account.login} / {account.password}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};