import React from "react";
import "./AltitudeIndicator.css";

const AltitudeIndicator = ({ altitude }) => {
  // לשמור שלא יחרוג מ3000
  const clampedAltitude = Math.max(0, Math.min(3000, altitude));

  // התאמה של גובה החץ לגובה התוויות
  const altitudePercentage = (clampedAltitude / 3000) * 100;
  const adjustedBottom = `calc(${altitudePercentage}% - ${altitudePercentage*0.3}px)`; // Adjusted positioning

  return (
    <div className="altitude-container">
      <div className="altitude-bar">
        <div className="altitude-marker" style={{ bottom: adjustedBottom }}>
          ➝
        </div>
        <div className="altitude-labels">
          <span>3000</span>
          <span>2000</span>
          <span>1000</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default AltitudeIndicator;
