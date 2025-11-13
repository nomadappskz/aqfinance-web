import { CompanySettings } from './storage';

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

export const getCompanySettings = (): CompanySettings => {
  return getItem('companySettings', {
    name: 'Мой бизнес',
    currency: '₸',
    address: '',
    phone: '',
    email: ''
  });
};

export const saveCompanySettings = (settings: CompanySettings): CompanySettings => {
  setItem('companySettings', settings);
  return settings;
};