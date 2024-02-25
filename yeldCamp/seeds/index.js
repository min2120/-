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
      author: "65db2ca6694ecb952702241d",
      // 유저오브젝트아이디 찾기, 몽구스 db에서    $ db.users.find({username: 'sam'})
      // 그리고 데이터베이스 재실행  $ node seeds/index.js
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, hic! Cum sequi quis nisi amet sapiente maiores, beatae expedita repellendus, veritatis deserunt unde consequuntur nihil quasi? Doloremque recusandae reiciendis deleniti.",
      price,
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
