import React, { useState, useEffect } from 'react';
import './PinLogin.css';

interface PinLoginProps {
  onLogin: (role: 'admin' | 'manager' | 'seller') => void;
}

export const PinLogin: React.FC<PinLoginProps> = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const users = {
    '1122': 'admin',
    '1111': 'manager', 
    '0000': 'seller'
  };

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 4) {
        const userRole = users[newPin as keyof typeof users];
        if (userRole) {
          onLogin(userRole as 'admin' | 'manager' | 'seller');
        } else {
          setError('Неверный пин-код');
          setTimeout(() => {
            setPin('');
            setError('');
          }, 1000);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  const getPinDots = () => {
    return Array(4).fill(0).map((_, index) => (
      <div 
        key={index} 
        className={`pin-dot ${index < pin.length ? 'filled' : ''}`}
      />
    ));
  };

  return (
    <div className="pin-login-container">
      <div className="pin-login-card">
        <div className="logo">
          <h1>AQFinance</h1>
          <p>Система управления продажами</p>
        </div>

        <div className="pin-display">
          <div className="pin-dots">
            {getPinDots()}
          </div>
          {error && <div className="pin-error">{error}</div>}
        </div>

        <div className="pin-keypad">
          <div className="keypad-row">
            <button onClick={() => handleNumberClick('1')} className="pin-key">1</button>
            <button onClick={() => handleNumberClick('2')} className="pin-key">2</button>
            <button onClick={() => handleNumberClick('3')} className="pin-key">3</button>
          </div>
          <div className="keypad-row">
            <button onClick={() => handleNumberClick('4')} className="pin-key">4</button>
            <button onClick={() => handleNumberClick('5')} className="pin-key">5</button>
            <button onClick={() => handleNumberClick('6')} className="pin-key">6</button>
          </div>
          <div className="keypad-row">
            <button onClick={() => handleNumberClick('7')} className="pin-key">7</button>
            <button onClick={() => handleNumberClick('8')} className="pin-key">8</button>
            <button onClick={() => handleNumberClick('9')} className="pin-key">9</button>
          </div>
          <div className="keypad-row">
            <button className="pin-key empty"></button>
            <button onClick={() => handleNumberClick('0')} className="pin-key">0</button>
            <button onClick={handleDelete} className="pin-key delete">⌫</button>
          </div>
        </div>

        <div className="demo-pins">
          <p>Тестовые пин-коды:</p>
          <div>Admin: 1122</div>
          <div>Менеджер: 1111</div>
          <div>Кассир: 0000</div>
        </div>
      </div>
    </div>
  );
};