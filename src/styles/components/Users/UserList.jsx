import React, { useState } from 'react';
import { getUsers, saveUser, deleteUser, getCurrentSession } from '../../utils/storage';
import UserForm from './UserForm';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState(getUsers());
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const currentUser = getCurrentSession()?.user;

  const handleSave = () => {
    setUsers(getUsers());
    setShowForm(false);
    setEditingUser(null);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (username) => {
    if (username === currentUser?.username) {
      alert('Нельзя удалить самого себя!');
      return;
    }
    
    if (window.confirm(`Удалить пользователя ${username}?`)) {
      deleteUser(username);
      setUsers(getUsers());
    }
  };

  const getRoleName = (role) => {
    const roles = {
      owner: 'Владелец',
      manager: 'Управляющий',
      cashier: 'Кассир'
    };
    return roles[role] || role;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👥 Сотрудники</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Добавить сотрудника
        </button>
      </div>

      <div className="users-list">
        {users.map(user => (
          <div key={user.username} className="user-card">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p className="user-username">Логин: {user.username}</p>
              <span className={`role-badge role-${user.role}`}>
                {getRoleName(user.role)}
              </span>
            </div>
            
            <div className="user-actions">
              <button 
                className="btn-edit"
                onClick={() => handleEdit(user)}
                disabled={user.username === currentUser?.username}
              >
                Изменить
              </button>
              <button 
                className="btn-delete"
                onClick={() => handleDelete(user.username)}
                disabled={user.username === currentUser?.username}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <UserForm
          user={editingUser}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserList;