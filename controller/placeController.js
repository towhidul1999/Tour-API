const axios = require("axios");
require("dotenv").config();

async function places(req, res) {
  const location = req.query.location;
  const radius = req.query.radius;
  const type = req.query.type;
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${GOOGLE_PLACES_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function searchPlaces(req, res) {
  const location = req.query.location;
  const radius = req.query.radius;
  const type = req.query.type;
  const keyword = req.query.keyword;
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_PLACES_API_KEY}`;

  if (location) {
    url += `&location=${location}`;
  }

  if (radius) {
    url += `&radius=${radius}`;
  }

  if (type) {
    url += `&type=${type}`;
  }

  if (keyword) {
    url += `&keyword=${keyword}`;
  }

  try {
    const response = await axios.get(url);
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function placeDetails(req, res) {
  const placeId = req.params.placeId;
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data.result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function fetchLocation(req, res) {
  const placeId = req.params.placeId;
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos,reviews&key=${GOOGLE_PLACES_API_KEY}`;

  try {
    const placeDetailsResponse = await axios.get(placeDetailsUrl);
    const placeDetails = placeDetailsResponse.data.result;

    const photos = placeDetails.photos.map((photo) => {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`;
    });

    const reviews = placeDetails.reviews;

    res.json({ photos, reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function direction(req, res) {
  const origin = req.query.origin;
  const destination = req.query.destination;
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_PLACES_API_KEY}`;

  try {
    const directionsResponse = await axios.get(directionsUrl);
    res.json(directionsResponse.data.routes[0].legs[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function attraction(req, res) {
  const location = req.query.location;
  const radius = req.query.radius;
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  const attractionsUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=tourist_attraction&key=${GOOGLE_PLACES_API_KEY}`;

  try {
    const attractionsResponse = await axios.get(attractionsUrl);
    res.json(attractionsResponse.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  places,
  searchPlaces,
  placeDetails,
  fetchLocation,
  direction,
  attraction,
};
