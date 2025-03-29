require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 

// חיבור לבסיס הנתונים
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// מגדיר מודל עבור בסיס הנתונים
const DataSchema = new mongoose.Schema({
  altitude: { 
    type: Number, 
    required: true, 
    min: 0,     
    max: 3000,  
  },
  his: { 
    type: Number, 
    required: true, 
    min: 0,     
    max: 360,   
  },
  adi: { 
    type: Number, 
    required: true, 
    min: -100,  
    max: 100,   
  },
});


const DataModel = mongoose.model("FlightData", DataSchema);

// נקודת קצה לקבלת נתונים
app.get("/api/data", async (req, res) => {
  try {
    const latestData = await DataModel.findOne().sort({ _id: -1 });
    res.json(latestData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// נקודת קצה לשמור את הנתונים מהממשק
// אייפיאיי לקבלת נתונים
// אייפיאיי לשליחת נתונים
app.post("/api/data", async (req, res) => {
  try {
    const { altitude, his, adi } = req.body;

    console.log("Received data:", { altitude, his, adi }); // Check if data is received

    // שמירת המידע בבסיס הנתונים
    const newData = new DataModel({ altitude, his, adi });
    await newData.save();

    res.status(200).send({ message: "your input is saved" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({ message: "Error saving data" });
  }
});



// להתחיל את השרת
const PORT =  5000;
app.listen(PORT, '0.0.0.0', () => { // מאפשר לאשר בקשות גישה לאתר מכל מכשיר ברשת האינטרנטית הפרטית
  console.log(`Server running on port ${PORT}`);
});
