const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({
      message: "Query parameter missing",
    });
  }
  if (typeof query !== "string") {
    return res.status(400).json({
      message: "Query parameter not a text",
    });
  }
  try {
    const response = await axios.get(`${BASE_URL}/search?q=${query}&apikey=${API_KEY}&max=10`);
    return res.status(200).json({
      message: "success",
      data: response.data,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});


app.get("/api/category", async (req, res) => {
  const category = req.query.category;
  const country = req.query.country;
  const language = req.query.language;

  console.log(country);
  console.log(category);

  if (!category) {
    return res.status(400).json({
      message: "Category parameter missing",
    });
  }
  if (typeof category !== "string") {
    return res.status(400).json({
      message: "Category parameter not a text",
    });
  }

  try {
    const response = await axios.get(`${BASE_URL}/top-headlines?category=${category}&apikey=${API_KEY}&max=10&country=${country}&lang=${language}`);

    return res.status(200).json({
      message: "success",
      data: response.data,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
