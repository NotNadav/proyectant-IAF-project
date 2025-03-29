// src/components/AdiIndicator.js
import React from 'react';
import './AdiIndicator.css';

const AdiIndicator = ({ adi }) => {
  const circleColor = adi === 100 ? 'blue' : adi === 0 ? 'green' : 'grey'; // בחירת הצבע לפי הערך שהתקבל מהמשתמש

  return (
    <div className="adi-container">
      <div className="adi-circle" style={{ backgroundColor: circleColor }}>
        <p className="adi-value">{adi}</p>
      </div>
    </div>
  );
};

export default AdiIndicator;
