import React, { useState } from 'react';
import { User, SaleItem } from '../../types';
import { storage } from '../../utils/storage';

interface SalesInterfaceProps {
  user: User;
  onLogout: () => void;
  onBack: () => void;
  onCashBalanceUpdate: (newBalance: number) => void;
}

export const SalesInterface: React.FC<SalesInterfaceProps> = ({
  user,
  onLogout,
  onBack,
  onCashBalanceUpdate
}) => {
  const [items, setItems] = useState<SaleItem[]>([]);
  const [paymentType, setPaymentType] = useState<'cash' | 'card' | 'mixed'>('cash');
  const [cashAmount, setCashAmount] = useState('');
  const [cardAmount, setCardAmount] = useState('');

  const sampleProducts = [
    { id: '1', name: 'Золотое кольцо', price: 15000, category: 'Кольцо' },
    { id: '2', name: 'Серебряные серьги', price: 8000, category: 'Серьги' },
    { id: '3', name: 'Цепь золотая', price: 25000, category: 'Цепочки' },
    { id: '4', name: 'Браслет', price: 12000, category: 'Браслеты' },
  ];

  const addItem = (product: typeof sampleProducts[0]) => {
    setItems(prev => [...prev, { ...product, id: Date.now().toString(), quantity: 1 }]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const calculateChange = () => {
    const cash = parseFloat(cashAmount) || 0;
    return cash - total;
  };

  const completeSale = () => {
    if (items.length === 0) return;
    
    const sales = storage.getSales();
    const sale = {
      id: Date.now().toString(),
      items: [...items],
      paymentType,
      total,
      cashAmount: paymentType === 'cash' ? total : paymentType === 'mixed' ? parseFloat(cashAmount) : undefined,
      cardAmount: paymentType === 'card' ? total : paymentType === 'mixed' ? parseFloat(cardAmount) : undefined,
      change: paymentType === 'cash' ? calculateChange() : undefined,
      date: new Date()
    };
    
    sales.push(sale);
    storage.saveSales(sales);

    if (paymentType === 'cash' || paymentType === 'mixed') {
      const cashIncome = paymentType === 'cash' ? total : parseFloat(cashAmount) || 0;
      const newBalance = storage.getCashBalance() + cashIncome;
      storage.saveCashBalance(newBalance);
      onCashBalanceUpdate(newBalance);
    }
    
    setItems([]);
    setPaymentType('cash');
    setCashAmount('');
    setCardAmount('');
    
    alert('Продажа завершена!');
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <button onClick={onBack} className="back-btn">← Назад</button>
          <h1>Касса продаж</h1>
          <div className="user-info">
            <span>{user.name}</span>
            <button onClick={onLogout} className="logout-btn">Выйти</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="sales-container">
          <div className="products-section">
            <h3>📦 Товары</h3>
            <div className="products-grid">
              {sampleProducts.map(product => (
                <button
                  key={product.id}
                  onClick={() => addItem(product)}
                  className="product-card"
                >
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">{product.price.toLocaleString()} ₸</div>
                  <div className="product-category">{product.category}</div>
                </button>
              ))}
            </div>
          </div>

          {items.length > 0 && (
            <div className="current-check">
              <h3>🧾 Текущий чек</h3>
              {items.map(item => (
                <div key={item.id} className="check-item">
                  <span>{item.name}</span>
                  <div>
                    <span>{item.price.toLocaleString()} ₸</span>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="remove-btn"
                    >×</button>
                  </div>
                </div>
              ))}
              
              <div className="check-total">
                Итого: {total.toLocaleString()} ₸
              </div>

              <div className="payment-section">
                <h4>💳 Оплата</h4>
                <div className="payment-types">
                  <button
                    onClick={() => setPaymentType('cash')}
                    className={paymentType === 'cash' ? 'active' : ''}
                  >
                    Наличные
                  </button>
                  <button
                    onClick={() => setPaymentType('card')}
                    className={paymentType === 'card' ? 'active' : ''}
                  >
                    Карта
                  </button>
                  <button
                    onClick={() => setPaymentType('mixed')}
                    className={paymentType === 'mixed' ? 'active' : ''}
                  >
                    Смешанная
                  </button>
                </div>

                {paymentType !== 'card' && (
                  <div className="input-group">
                    <label>Сумма наличными</label>
                    <input
                      type="number"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      placeholder="0"
                    />
                    {paymentType === 'cash' && cashAmount && (
                      <div className="change">
                        Сдача: {calculateChange().toLocaleString()} ₸
                      </div>
                    )}
                  </div>
                )}

                {paymentType !== 'cash' && (
                  <div className="input-group">
                    <label>Сумма картой</label>
                    <input
                      type="number"
                      value={cardAmount}
                      onChange={(e) => setCardAmount(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                )}

                <button 
                  onClick={completeSale}
                  className="complete-sale-btn"
                >
                  ✅ Завершить продажу
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};