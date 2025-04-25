const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // If using Node.js <18
const app = express();
const PORT = 3000;

// Replace these with your actual GA4 credentials
const MEASUREMENT_ID = "G-HTYF1DDXEZ";
const API_SECRET = "2B0wmXRXSj6S46cXZcE8Jw";

app.use(cors());
app.use(express.json());

app.post("/track-event", async (req, res) => {
  const endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;

  try {
    const updatedPayload = {
      ...req.body,
      events: req.body.events.map(event => ({
        ...event,
        params: {
          ...event.params,
          debug_mode: true, // 🛠️ This line enables DebugView tracking
        }
      })),
    };
    
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(updatedPayload),
      headers: { "Content-Type": "application/json" },
    });    

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GA4 Error:", errorText);
      return res.status(500).json({ error: errorText });
    }

    res.status(200).json({ status: "success" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Tracking backend running at http://localhost:${PORT}`);
});
