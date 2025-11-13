// Базовые утилиты для работы с localStorage
export const getItem = (key: string, defaultValue: any = []) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '') || defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setItem = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};