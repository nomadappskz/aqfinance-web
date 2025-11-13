import { Session } from './storage';

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

export const saveSession = (user: any): Session => {
  const session: Session = { 
    user: {
      username: user.username,
      role: user.role,
      name: user.name
    }, 
    loggedInAt: new Date().toISOString() 
  };
  setItem('currentSession', session);
  return session;
};

export const getCurrentSession = (): Session | null => {
  return getItem('currentSession');
};

export const clearSession = (): void => {
  localStorage.removeItem('currentSession');
};