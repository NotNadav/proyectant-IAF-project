import React, { useState, useEffect } from "react";
import axios from "axios";
import AltitudeIndicator from "./components/AltitudeIndicator";
import HisIndicator from "./components/HisIndicator";
import AdiIndicator from "./components/AdiIndicator";
import "./App.css";


// API ENDPOINT (MY PC IP)
const Adress = "http://10.100.102.141:5000/api/data"; // כתובת השרת, כתובת האייפי של המחשב שלי (השרת)  
const App = () => {
  const [data, setData] = useState(null); // שומר את המידע
  const [viewMode, setViewMode] = useState("text"); // דרכי תצוגה
  const [isFormVisible, setIsFormVisible] = useState(false); // האם הטופס למילוי המידע מוצג למשתמש
  const [newData, setNewData] = useState({ altitude: "", his: "", adi: "" }); // הטופס

  // מביא את  המידע מהשרת
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Adress); 
        setData(response.data); 
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  // מחליף דרכי תצוגה
  const handleSwitchView = () => {
    setViewMode(viewMode === "text" ? "visual" : "text");
  };

// האם הטופס מוצג או לא
  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
  };

  // מטפל בשינויי מידע בקובץ
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  // מטפל בשליחת המידע
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { altitude, his, adi } = newData;

    // מטפל בבדיקות תקינות של הנתונים
    if (altitude < 0 || altitude > 3000) {
      alert("Altitude must be between 0 and 3000");
      return;
    }
    if (his < 0 || his > 360) {
      alert("HIS must be between 0 and 360");
      return;
    }
    if (adi < -100 || adi > 100) {
      alert("ADI must be between -100 and 100");
      return;
    }

    // שולח את המידע לשרת
    try {
      await axios.post(Adress, {
        altitude,
        his,
        adi,
      });
      alert("Data saved!");
      // מביא את הנתונים שוב כדי לעדכן את התצוגה
      const response = await axios.get(Adress);
      setData(response.data); 
    } catch (error) {
      alert("Error saving data: " + error.response.data.message);
    }
  };


  // html
  return (
    <div className="App">
      <h1>מכווני טיסה</h1>
      <button onClick={handleSwitchView}>
        {viewMode === "text" ? "Visual" : "Text"} View
      </button>
      
      <button onClick={handleFormToggle} className="add-btn">
        +
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="data-form">
          <h2>הכנס נתונים חדשים</h2>
          <label>
            Altitude:
            <input
              type="number"
              name="altitude"
              value={newData.altitude}
              onChange={handleInputChange}
            />
          </label>
          <label>
            HIS:
            <input
              type="number"
              name="his"
              value={newData.his}
              onChange={handleInputChange}
            />
          </label>
          <label>
            ADI:
            <input
              type="number"
              name="adi"
              value={newData.adi}
              onChange={handleInputChange}
            />
          </label>
          <button type="send">שלח</button>
        </form>
      )}

      {data ? (
        viewMode === "text" ? (
          <div>
            <h2>Data (Text View)</h2>
            <p>Altitude: {data.altitude}</p>
            <p>HIS: {data.his}</p>
            <p>ADI: {data.adi}</p>
          </div>
        ) : (
          <div className="visual">
            <AltitudeIndicator altitude={data.altitude} />
            <HisIndicator his={data.his} />
            <AdiIndicator adi={data.adi} />
          </div>
        )
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default App;
