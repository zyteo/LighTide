require("dotenv").config()
const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;
import axios from "axios";
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// set a route which accepts a text and language for the geoapify
app.get("/api/geoapify", (req, res) => {
  const { text, lang } = req.query;
  axios
    .get(
      `https://api.geoapify.com/v1/geocode/search?text=${text}&lang=${lang}&limit=1&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
    )
    .then((response) => {
      if (response.data.features.length === 0) {
        res.status(400).send("No results found");
      } else {
        res.status(200).send(response.data);
      }
    }
    );
}




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

// Export the Express API
module.exports = app;