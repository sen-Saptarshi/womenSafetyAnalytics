const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const LocationSchema = require("./dbschema");
const mongoose = require("mongoose");
const PoliceSchema = require("./policeSchema");
const UserSchema = require("./userSchema");
const calculateWomenSafetyRisk = require("./calculateRisk");
mongoose
  .connect("mongodb://127.0.0.1:27017/womenSafetyAnalytics", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json());

// Function to fetch risk data from the API
async function getRisk() {
  try {
    let response = await axios.get(
      "https://swtrmrt7-5000.inc1.devtunnels.ms/data"
    );

    let mfr = response.data.male / response.data.female;

    return Math.floor(
      calculateWomenSafetyRisk(new Date().getHours(), mfr, response.data.risk)
    );
  } catch (error) {
    console.error("Error fetching risk data:", error);
    return { alert: false, message: "Error fetching data" }; // Default return value on error
  }
}

// Route to handle admin requests
app.get("/getrisk", async (req, res) => {
  try {
    let risk = await getRisk();
    // Redirect based on the 'alert' status
    if (risk > 20) {
      return res.json({ risk, alert: true });
    }
    res.json({ risk, alert: false });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route to handle police requests
// app.get("/police", (req, res) => {
//   res.send("Hello, police");
// });

app.post("/history", async (req, res) => {
  try {
    const locations = await LocationSchema.find({ name: req.body.name });
    res.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});
const policeMiddleware = (req, res, next) => {
  if (req.body.section === "police") {
    next();
  }
};

app.post("/report", policeMiddleware, async (req, res) => {
  try {
    const existingLocation = await LocationSchema.findOne({
      name: req.body.name.toLowerCase(),
    });
    if (existingLocation) {
      existingLocation.countOfCrimes++;
      await existingLocation.save();
      res.json(existingLocation);
    } else {
      const newLocation = new LocationSchema({
        name: req.body.name.toLowerCase(),
        countOfCrimes: 1,
      });
      await newLocation.save();
      res.json(newLocation);
    }
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ error: "Failed to save location" });
  }
});

// Middleware to check if user is logged in

const userMiddleware = (req, res, next) => {
  if (req.body.section === "user") {
    next();
  }
};

// Middleware to check if police is logged in
app.post("/login", async (req, res) => {
  if (req.body.section === "police") {
    try {
      const user = await UserSchema.findOne({ email: req.body.email });
      if (user && user.password === req.body.password) {
        res.json(user);
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Failed to log in" });
    }
  }
});

app.post("/signup", async (req, res) => {
  if (req.body.section === "police") {
    try {
      const newPolice = new PoliceSchema({
        name: req.body.name,
        unique_id: req.body.unique_id,
        station: req.body.station,
        password: req.body.password,
      });
      await newPolice.save();
      res.json(newPolice);
    } catch (error) {
      console.error("Error saving police data:", error);
      res.status(500).json({ error: "Failed to save police data" });
    }
  } else if (req.body.section === "user") {
    try {
      const newUser = new UserSchema({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      console.error("Error saving user data:", error);
      res.status(500).json({ error: "Failed to save user data" });
    }
  } else {
    res.status(400).json({ error: "Invalid section" });
  }
});

// Start the server
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
