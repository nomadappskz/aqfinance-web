import type { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    login: 'admin',
    password: '123123',
    role: 'admin',
    name: 'Администратор'
  },
  {
    id: '2', 
    login: 'manager',
    password: '123123',
    role: 'manager',
    name: 'Управляющий'
  },
  {
    id: '3',
    login: 'kassiri',
    password: '123123',
    role: 'kassiri',
    name: 'Продавец'
  }
];

export const testAccounts = [
  { role: 'Владелец', login: 'admin', password: '123123' },
  { role: 'Управляющий', login: 'manager', password: '123123' },
  { role: 'Продавец', login: 'kassiri', password: '123123' }
];