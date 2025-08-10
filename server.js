require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(
  cors({
    origin: ["https://lightide.vercel.app"],
  })
);

app.get("/", (req, res) => {
  res.send("Express on Vercel.");
});

// set a route which accepts a text and language for the geoapify
app.get("/api/geoapify", (req, res) => {
  const { text, lang } = req.query;
  axios
    .get(
      `https://api.geoapify.com/v1/geocode/search?text=${text}&lang=${lang}&limit=1&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
    )
    .then((response) => {
      // console.log(response);
      if (response.data.features.length === 0) {
        res.json({ error: "No results found" });
      } else {
        res.status(200).json(response.data);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// set up tide that takes lat, long, and date
app.get("/api/tide", (req, res) => {
  const { lat, long, date } = req.query;
  axios
    .get(
      `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${long}&start=${date}&key=${process.env.REACT_APP_TIDE_API_KEY}`
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// set up api for sun details
app.get("/api/sun", (req, res) => {
  const { lat, long, date } = req.query;
  axios
    .get(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=${date}&formatted=0`
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

// Export the Express API
module.exports = app;
