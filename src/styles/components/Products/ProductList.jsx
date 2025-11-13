import React, { useState } from 'react';
import { getProducts, saveProduct, deleteProduct } from '../../utils/storage';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState(getProducts());
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', category: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProduct(formData);
    setProducts(getProducts());
    setShowForm(false);
    setFormData({ name: '', price: '', category: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Удалить товар?')) {
      deleteProduct(id);
      setProducts(getProducts());
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📦 Мои товары</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Добавить товар
        </button>
      </div>

      {/* Список товаров */}
      <div className="products-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <p className="product-price">{product.price} ₸</p>
            </div>
            <button 
              className="btn-delete"
              onClick={() => handleDelete(product.id)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>

      {/* Форма добавления */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Добавить товар</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Название товара"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Цена"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Выберите категорию</option>
                <option value="Напитки">Напитки</option>
                <option value="Еда">Еда</option>
                <option value="Снеки">Снеки</option>
                <option value="Разное">Разное</option>
              </select>
              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)}>
                  Отмена
                </button>
                <button type="submit" className="btn-primary">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;