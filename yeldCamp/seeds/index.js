const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

main().catch((err) => {
  console.log("화이팅 오류");
  console.log(err);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("connected to database");
}

/** (array) => array[Math.floor(Math.random() * array.length)] */
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // YOUR USER ID
      author: "65db2ca6694ecb952702241d",
      // 유저오브젝트아이디 찾기, 몽구스 db에서    $ db.users.find({username: 'sam'})
      // 그리고 데이터베이스 재실행  $ node seeds/index.js
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dd1x5mwes/image/upload/v1709165142/YelpCamp/e%CC%82_e%CC%82_e%CC%82_e%CC%82_e%CC%82_%C2%AA_e%CC%82_e%CC%82_e%CC%82_e%CC%82_%C2%AAe%CC%82_99_e%CC%82_e%CC%82_e%CC%82_e%CC%82_e%CC%82_e%CC%82__08_vyblg4.jpg",
          filename: "YelpCamp/ê_ê_ê_ê_ê_ª_ê_ê_ê_ê_ªê_99_ê_ê_ê_ê_ê_ê__08_vyblg4",
        },
        {
          url: "https://res.cloudinary.com/dd1x5mwes/image/upload/v1709165158/YelpCamp/e%CC%82_e%CC%82_e%CC%82_e%CC%82_e%CC%82_%C2%AA_e%CC%82_e%CC%82_e%CC%82_e%CC%82_%C2%AAe%CC%82_99_e%CC%82_e%CC%82_e%CC%82_e%CC%82_e%CC%82_e%CC%82__22_q835oq.jpg",
          filename: "YelpCamp/ê_ê_ê_ê_ê_ª_ê_ê_ê_ê_ªê_99_ê_ê_ê_ê_ê_ê__22_q835oq",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, hic! Cum sequi quis nisi amet sapiente maiores, beatae expedita repellendus, veritatis deserunt unde consequuntur nihil quasi? Doloremque recusandae reiciendis deleniti.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
