import { User } from './storage';

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

export const getUsers = (): User[] => {
  const users = getItem('users');
  if (users.length === 0) {
    const defaultUsers: User[] = [
      { 
        username: 'admin', 
        password: 'admin123', 
        role: 'owner', 
        name: 'Владелец',
        createdAt: new Date().toISOString()
      },
      { 
        username: 'manager', 
        password: 'manager123', 
        role: 'manager', 
        name: 'Управляющий',
        createdAt: new Date().toISOString()
      },
      { 
        username: 'kassir1', 
        password: 'kassir123', 
        role: 'cashier', 
        name: 'Кассир 1',
        createdAt: new Date().toISOString()
      }
    ];
    setItem('users', defaultUsers);
    return defaultUsers;
  }
  return users;
};

export const getUserByUsername = (username: string): User | undefined => {
  return getUsers().find(user => user.username === username);
};

export const saveUser = (userData: Omit<User, 'createdAt'> & { password?: string }): User => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.username === userData.username);
  
  const user: User = {
    ...userData as User,
    createdAt: userData.createdAt || new Date().toISOString()
  };

  if (existingIndex >= 0) {
    if (userData.password) {
      users[existingIndex] = user;
    } else {
      users[existingIndex] = {
        ...user,
        password: users[existingIndex].password
      };
    }
  } else {
    users.push(user);
  }
  
  setItem('users', users);
  return user;
};

export const deleteUser = (username: string): boolean => {
  const users = getUsers().filter(user => user.username !== username);
  setItem('users', users);
  return true;
};