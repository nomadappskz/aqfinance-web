import { getSales, getProducts, getExpenses } from './index';

export const exportData = (type: 'sales' | 'products' | 'expenses'): void => {
  let data: any;
  let filename: string;
  
  switch (type) {
    case 'sales':
      data = getSales();
      filename = `продажи-${new Date().toLocaleDateString('ru-RU')}.json`;
      break;
    case 'products':
      data = getProducts();
      filename = `товары-${new Date().toLocaleDateString('ru-RU')}.json`;
      break;
    case 'expenses':
      data = getExpenses();
      filename = `расходы-${new Date().toLocaleDateString('ru-RU')}.json`;
      break;
    default:
      return;
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};