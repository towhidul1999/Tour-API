const axios = require("axios");
require("dotenv").config();
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

async function weather(req, res) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.query.location}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
    );
    res.json({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getForecast(req, res) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${req.query.location}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
    );
    res.json(
      response.data.list.map((item) => ({
        dateTime: item.dt_txt,
        temperature: item.main.temp,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
      }))
    );
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  weather,
  getForecast,
};
