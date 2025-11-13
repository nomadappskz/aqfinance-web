import React, { useState } from 'react';
import { User, Expense } from '../../types';
import { storage } from '../../utils/storage';

interface ExpensesManagementProps {
  user: User;
  onLogout: () => void;
  onBack: () => void;
  onCashBalanceUpdate: (newBalance: number) => void;
}

export const ExpensesManagement: React.FC<ExpensesManagementProps> = ({
  user,
  onLogout,
  onBack,
  onCashBalanceUpdate
}) => {
  const [expenses, setExpenses] = useState<Expense[]>(storage.getExpenses());
  const [expenseType, setExpenseType] = useState<Expense['type']>('salary_seller');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  const expenseTypes = {
    salary_seller: 'ЗП продавца',
    salary_manager: 'ЗП управляющего',
    rent: 'Аренда',
    goods: 'Товар',
    utilities: 'Коммунальные',
    safe: 'Сейф (отложить)'
  };

  const addExpense = () => {
    if (!expenseAmount || parseFloat(expenseAmount) <= 0) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      type: expenseType,
      amount: parseFloat(expenseAmount),
      description: expenseDescription,
      date: new Date()
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    storage.saveExpenses(updatedExpenses);

    const newBalance = storage.getCashBalance() - parseFloat(expenseAmount);
    storage.saveCashBalance(newBalance);
    onCashBalanceUpdate(newBalance);

    setExpenseAmount('');
    setExpenseDescription('');
    alert('Расход добавлен!');
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <button onClick={onBack} className="back-btn">← Назад</button>
          <h1>Управление расходами</h1>
          <div className="user-info">
            <span>{user.name}</span>
            <button onClick={onLogout} className="logout-btn">Выйти</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="expenses-container">
          <div className="expense-form">
            <h3>💼 Добавить расход</h3>
            <div className="form-grid">
              <div className="input-group">
                <label>Тип расхода</label>
                <select 
                  value={expenseType} 
                  onChange={(e) => setExpenseType(e.target.value as Expense['type'])}
                >
                  {Object.entries(expenseTypes).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Сумма (₸)</label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="input-group full-width">
                <label>Описание</label>
                <input
                  type="text"
                  value={expenseDescription}
                  onChange={(e) => setExpenseDescription(e.target.value)}
                  placeholder="Комментарий к расходу"
                />
              </div>
            </div>
            <button onClick={addExpense} className="primary-btn">
              💾 Сохранить расход
            </button>
          </div>

          <div className="expenses-list">
            <h3>📋 История расходов</h3>
            {expenses.length === 0 ? (
              <p>Нет расходов</p>
            ) : (
              expenses.map(expense => (
                <div key={expense.id} className="expense-item">
                  <div className="expense-info">
                    <div className="expense-type">{expenseTypes[expense.type]}</div>
                    <div className="expense-amount">-{expense.amount.toLocaleString()} ₸</div>
                  </div>
                  <div className="expense-description">{expense.description}</div>
                  <div className="expense-date">{new Date(expense.date).toLocaleDateString()}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};