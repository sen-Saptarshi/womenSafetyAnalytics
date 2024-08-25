const express = require("express");
const app = express();
const axios = require("axios");
app.use(express.urlencoded({ extended: true }));
const LocationSchema = require("./dbschema");
const mongoose = require("mongoose");
const PoliceSchema = require("./policeSchema");
const UserSchema = require("./userSchema");

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
      "https://824x24f1-5000.inc1.devtunnels.ms/data"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching risk data:", error);
    return { alert: false, message: "Error fetching data" }; // Default return value on error
  }
}

// Route to handle admin requests
app.get("/admin", async (req, res) => {
  try {
    let risk = await getRisk();

    // Redirect based on the 'alert' status
    if (risk.risk) {
      res.redirect("/police");
    } else {
      res.send(`${risk.message}`);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route to handle police requests
app.get("/police", (req, res) => {
  res.send("Hello, police");
});

app.post("/history", async (req, res) => {
  try {
    const locations = await LocationSchema.find({ name: req.body.name });
    res.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});

app.post("/report", async (req, res) => {
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

app.post("/signup", async (req, res) => {
  if (req.body.section === "police") {
    app.post("/police/signup", async (req, res) => {
      try {
        const newPolice = new PoliceSchema({
          name: req.body.name,
          unique_id: req.body.unique_id,
          station: req.body.station,
          address: req.body.address,
          passwored: req.body.passwored,
        });
        await newPolice.save();
        res.json(newPolice);
      } catch (error) {
        console.error("Error saving police data:", error);
        res.status(500).json({ error: "Failed to save police data" });
      }
    });
  } else if (req.body.section === "user") {
    app.post("/user/signup", async (req, res) => {
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
    });
  }
});


// Start the server
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
