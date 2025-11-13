import React, { useState, useEffect } from 'react';
import { saveProduct, getProductById } from '../../utils/storage';
import './ProductForm.css';

const ProductForm = ({ productId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    cost: '',
    stock: '',
    barcode: '',
    description: '',
    image: ''
  });

  const categories = ['Электроника', 'Одежда', 'Продукты', 'Канцелярия', 'Другое'];

  useEffect(() => {
    if (productId) {
      const product = getProductById(productId);
      if (product) {
        setFormData(product);
      }
    }
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      id: productId || Date.now().toString(),
      price: parseFloat(formData.price),
      cost: parseFloat(formData.cost),
      stock: parseInt(formData.stock),
      createdAt: productId ? formData.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveProduct(productData);
    onSave(productData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content product-form">
        <h2>{productId ? 'Редактировать товар' : 'Добавить товар'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Название товара *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Введите название"
              />
            </div>
            
            <div className="form-group">
              <label>Категория</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Выберите категорию</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Цена продажи *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
            
            <div className="form-group">
              <label>Себестоимость</label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Количество на складе *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
              />
            </div>
            
            <div className="form-group">
              <label>Штрих-код</label>
              <input
                type="text"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                placeholder="Введите штрих-код"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Описание</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Описание товара"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>URL изображения</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className="btn-primary">
              {productId ? 'Обновить' : 'Добавить'} товар
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;