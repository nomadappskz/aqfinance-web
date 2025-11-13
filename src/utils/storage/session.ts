import { Session } from './types';
import { getItem, setItem } from './base';

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