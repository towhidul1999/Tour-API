const express = require("express");
const app = express();
app.use(express.json());

//import weather controller function
const weatherController = require("./controller/weatherController");
//import place controller function
const placeController = require("./controller/placeController");
//import activity controller function
const activityController = require("./controller/activityController");
//import hotel controller function
const hotelController = require("./controller/hotelController");
//import user controller function
const userController = require("./controller/userController");
//import payment controller function
const paymentController = require("./controller/paymentController");

//Weather API
app.get("/weather", weatherController.weather);
app.get("/forecast", weatherController.getForecast);

//Place API
app.get("/places", placeController.places);
app.get("/search-places", placeController.searchPlaces);
app.get("/place/:placeId", placeController.placeDetails);
app.get("/all-place/:placeId", placeController.fetchLocation);
app.get("/directions", placeController.direction);
app.get("/attractions", placeController.attraction);

//Activity API
app.get("/activities", activityController.activitie);
app.get("/activities/:id", activityController.activitieDetails);
app.post("/bookings", activityController.ac_bookings);
app.get("/bookings/:id", activityController.activitieDetails);

//Hotel API
app.get("/hotels", hotelController.hotel);
app.get("/hotels/:id", hotelController.hoteldetails);
app.post("/bookings", hotelController.booking);
app.get("/bookings/:id", hotelController.bookingsDetails);

// User Authentication API

app.post("/register", userController.registerUser);
app.post("/login", userController.userLogin);
app.get("/profile", userController.userProfile);

//Payment gateway API
app.post("/payment", paymentController.payment);

app.listen(3000, () => console.log("Server started on port 3000"));
