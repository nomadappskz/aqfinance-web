import { Product } from './storage';

const getItem = (key: string, defaultValue: any = []) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '') || defaultValue;
  } catch {
    return defaultValue;
  }
};

const setItem = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const saveProduct = (productData: Omit<Product, 'id' | 'createdAt'> & { id?: string }): Product => {
  const products = getProducts();
  const product: Product = {
    id: productData.id || Date.now().toString(),
    name: productData.name,
    price: productData.price,
    category: productData.category,
    createdAt: productData.createdAt || new Date().toISOString()
  };
  
  const existingIndex = products.findIndex(p => p.id === product.id);
  if (existingIndex >= 0) {
    products[existingIndex] = product;
  } else {
    products.push(product);
  }
  
  setItem('products', products);
  return product;
};

export const getProducts = (): Product[] => {
  const products = getItem('products');
  if (products.length === 0) {
    const defaultProducts: Product[] = [
      { id: '1', name: 'Кофе', price: 500, category: 'Напитки', createdAt: new Date().toISOString() },
      { id: '2', name: 'Чай', price: 300, category: 'Напитки', createdAt: new Date().toISOString() },
      { id: '3', name: 'Печенье', price: 250, category: 'Снеки', createdAt: new Date().toISOString() },
      { id: '4', name: 'Вода', price: 200, category: 'Напитки', createdAt: new Date().toISOString() }
    ];
    setItem('products', defaultProducts);
    return defaultProducts;
  }
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return getProducts().find(product => product.id === id);
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts().filter(p => p.id !== id);
  setItem('products', products);
  return true;
};

export const searchProducts = (query: string): Product[] => {
  const products = getProducts();
  const lowerQuery = query.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  );
};