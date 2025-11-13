import { CompanySettings } from './types';
import { getItem, setItem } from './base';

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