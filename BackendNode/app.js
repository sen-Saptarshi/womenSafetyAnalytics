const express = require("express");
const app = express();
const axios = require("axios");

async function getRisk() {
  let risk = await axios.get("https://824x24f1-5000.inc1.devtunnels.ms/data");
  return risk.data;
}

app.get("/", async (req, res) => {
  // Set the headers for chunked transfer encoding
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");

  const intervalId = setInterval(async () => {
    let risk = await getRisk();
    res.send(`The risk is ${risk.message}\n`);
  }, 2000);

  // Clean up when the client closes the connection
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(3000, () => {
  console.log("connection successful");
});
