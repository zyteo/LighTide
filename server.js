require("dotenv").config()
const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

// Export the Express API
module.exports = app;