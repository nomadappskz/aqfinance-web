import React, { useState, useEffect } from 'react';
import { saveUser, getUserByUsername } from '../../utils/storage';
import './UserForm.css';

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    role: 'cashier'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        password: '', // Не показываем текущий пароль
        name: user.name,
        role: user.role
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user && getUserByUsername(formData.username)) {
      alert('Пользователь с таким логином уже существует!');
      return;
    }

    const userData = {
      username: formData.username,
      password: formData.password,
      name: formData.name,
      role: formData.role
    };

    saveUser(userData);
    onSave();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{user ? 'Редактировать сотрудника' : 'Добавить сотрудника'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ФИО сотрудника *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              placeholder="Иван Иванов"
            />
          </div>

          <div className="form-group">
            <label>Логин *</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
              disabled={!!user} // Нельзя менять логин при редактировании
              placeholder="ivanov"
            />
          </div>

          <div className="form-group">
            <label>
              Пароль {user ? '(оставьте пустым чтобы не менять)' : '*'}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required={!user}
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label>Должность *</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="cashier">Кассир</option>
              <option value="manager">Управляющий</option>
              <option value="owner">Владелец</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className="btn-primary">
              {user ? 'Обновить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;