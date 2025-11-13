import React from 'react';
import { getSales } from '../../utils/storage';

const DeliveryOrders = () => {
  const sales = getSales();
  const deliveryOrders = sales.filter(sale => sale.delivery);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📦 Заказы доставки</h1>
      </div>

      <div className="orders-list">
        {deliveryOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3>👤 {order.delivery?.client}</h3>
              <span className={`status-badge ${order.delivery?.status || 'new'}`}>
                {order.delivery?.status === 'new' ? 'Новый' : 
                 order.delivery?.status === 'sent' ? 'Отправлен' : 'Доставлен'}
              </span>
            </div>
            
            <div className="order-info">
              <p>📱 Платформа: {order.delivery?.platform}</p>
              <p>🚚 Доставка: {order.delivery?.type}</p>
              {order.delivery?.address && <p>📍 Адрес: {order.delivery.address}</p>}
              {order.delivery?.phone && <p>📞 Телефон: {order.delivery.phone}</p>}
            </div>

            <div className="order-items">
              {order.items.map(item => (
                <div key={item.id} className="order-item">
                  {item.name} × {item.quantity} = {item.price * item.quantity}₸
                </div>
              ))}
            </div>

            <div className="order-total">
              <strong>💰 Итого: {order.total}₸</strong>
            </div>

            <div className="order-actions">
              <button className="btn-primary">✅ Отметить отправленным</button>
              <button className="btn-secondary">📋 Скопировать чек</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOrders;