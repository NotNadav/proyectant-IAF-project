import React from "react";
import "./HisIndicator.css";

const HisIndicator = ({ his }) => {
  // סיבוב העיגול בפנימי כתלות בערך שהתקבל מהמשתמש
  const rotateCircleStyle = {
    transform: `rotate(${-his}deg)`,
    transition: "transform 0.5s ease-in-out",
  };

  return (
    <div className="his-indicator">
      {/* העיגול החיצוני עם החץ הכתום */}
      <div className="outer-circle">
        <div className="needle"></div>
      </div>
      {/* עיגול פנימי שמסתובב לפי הערך */}
      <div className="inner-circle" style={rotateCircleStyle}>
        <div className="degree degree-0">0</div>
        <div className="degree degree-90">90</div>
        <div className="degree degree-180">180</div>
        <div className="degree degree-270">270</div>
      </div>
    </div>
  );
};

export default HisIndicator;
