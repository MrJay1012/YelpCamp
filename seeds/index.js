const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "662761d733783a4773d94a19",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi tempore ratione possimus quam non, mollitia hic consequatur eligendi tenetur eos a? Consectetur dolor repudiandae consequuntur asperiores vitae. Odio, labore provident!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dpnebg5cf/image/upload/v1715156452/YelpCamp/shg01x90om7obai1klre.jpg",
          filename: "YelpCamp/shg01x90om7obai1klre",
        },
        {
          url: "https://res.cloudinary.com/dpnebg5cf/image/upload/v1715156452/YelpCamp/nvzbp69yhc4rvtacidxy.jpg",
          filename: "YelpCamp/nvzbp69yhc4rvtacidxy",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  db.close();
});
