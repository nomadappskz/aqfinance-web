export const getCashBalance = (): number => {
  const balance = localStorage.getItem('cashBalance');
  return balance ? parseFloat(balance) : 0;
};

export const updateCashBalance = (amount: number): number => {
  const current = getCashBalance();
  const newBalance = current + amount;
  localStorage.setItem('cashBalance', newBalance.toString());
  return newBalance;
};

export const setCashBalance = (amount: number): number => {
  localStorage.setItem('cashBalance', amount.toString());
  return amount;
};