//Activity model
const activities = [
  {
    id: 1,
    name: "Hiking",
    location: "Mountain",
    date: "2022-01-01",
    price: 50,
    duration: 3,
    description: "A scenic hike up the mountain.",
    reviews: [
      {
        user: "John",
        rating: 5,
        comment: "Great hike!",
      },
      {
        user: "Jane",
        rating: 4,
        comment: "Beautiful views.",
      },
    ],
  },
  {
    id: 2,
    name: "Kayaking",
    location: "Lake",
    date: "2022-01-15",
    price: 40,
    duration: 2,
    description: "A relaxing kayaking trip on the lake.",
    reviews: [
      {
        user: "Bob",
        rating: 4,
        comment: "Fun activity.",
      },
      {
        user: "Alice",
        rating: 5,
        comment: "Loved it!",
      },
    ],
  },
];

async function activitie(req, res) {
  const location = req.query.location;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  // filter activities based on query parameters
  let filteredActivities = activities;
  if (location) {
    filteredActivities = filteredActivities.filter(
      (activity) => activity.location === location
    );
  }
  if (startDate) {
    filteredActivities = filteredActivities.filter(
      (activity) => activity.date >= startDate
    );
  }
  if (endDate) {
    filteredActivities = filteredActivities.filter(
      (activity) => activity.date <= endDate
    );
  }

  res.json(filteredActivities);
}

async function activitieDetails(req, res) {
  const id = req.params.id;

  // find activity by id
  const activity = activities.find((activity) => activity.id === parseInt(id));

  if (activity) {
    res.json(activity);
  } else {
    res.status(404).json({ message: "Activity not found" });
  }
}

const bookings = [];
async function ac_bookings(req, res) {
  const activityId = req.body.activityId;
  console.log(activityId);
  const name = req.body.name;
  const contact = req.body.contact;
  const payment = req.body.payment;

  // create new booking
  const booking = {
    id: bookings.length + 1,
    activityId,
    name,
    contact,
    payment,
    status: "pending",
  };
  bookings.push(booking);

  res.status(201).json(booking);
}

async function bookingsDetails(req, res) {
  const id = req.params.id;

  // find booking by id
  const booking = bookings.find((booking) => booking.id === parseInt(id));

  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
}

module.exports = {
  activitie,
  activitieDetails,
  ac_bookings,
  bookingsDetails,
};
