//Hotel model
let hotels = [
  {
    id: 1,
    name: "Hotel A",
    address: "123 Main St",
    rating: 4.5,
    amenities: ["Pool", "Gym", "Free WiFi"],
    roomTypes: [
      {
        type: "Standard",
        maxGuests: 2,
        pricePerNight: 100,
      },
      {
        type: "Deluxe",
        maxGuests: 4,
        pricePerNight: 200,
      },
    ],
    reviews: [
      {
        author: "John Doe",
        rating: 5,
        text: "Great hotel!",
      },
      {
        author: "Jane Doe",
        rating: 4,
        text: "Nice location",
      },
    ],
  },
  // ...
];

async function hotel(req, res) {
  let availableHotels = hotels;
  if (req.query.location) {
    availableHotels = availableHotels.filter((hotel) =>
      hotel.address.includes(req.query.location)
    );
  }
  if (req.query.guests) {
    availableHotels = availableHotels.filter((hotel) =>
      hotel.roomTypes.some((roomType) => roomType.maxGuests >= req.query.guests)
    );
  }
  res.json(
    availableHotels.map((hotel) => ({
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      rating: hotel.rating,
    }))
  );
}

async function hoteldetails(req, res) {
  const hotel = hotels.find((hotel) => hotel.id === parseInt(req.params.id));
  if (!hotel) {
    return res.status(404).send("Hotel not found");
  }
  res.json(hotel);
}

let bookings = [];
async function booking(req, res) {
  const hotel = hotels.find((hotel) => hotel.id === req.body.hotelId);
  if (!hotel) {
    return res.status(404).send("Hotel not found");
  }
  const roomType = hotel.roomTypes.find(
    (roomType) => roomType.type === req.body.roomType
  );
  if (!roomType) {
    return res.status(400).send("Invalid room type");
  }
  if (req.body.guests > roomType.maxGuests) {
    return res.status(400).send("Too many guests for selected room type");
  }
  const booking = {
    id: bookings.length + 1,
    guestName: req.body.guestName,
    guestContact: req.body.guestContact,
    paymentDetails: req.body.paymentDetails,
    hotelId: req.body.hotelId,
    roomType: req.body.roomType,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
  };
  bookings.push(booking);
  res.status(201).json(booking);
}

async function bookingsDetails(req, res) {
  const booking = bookings.find(
    (booking) => booking.id === parseInt(req.params.id)
  );
  if (!booking) {
    return res.status(404).send("Booking not found");
  }
  res.json(booking);
}

module.exports = {
  hotel,
  hoteldetails,
  booking,
  bookingsDetails,
};
