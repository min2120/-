const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  images: [{ url: String, filename: String }],
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // owner, user등 // 추가해주고, 시드모델과 값이 다르면 나중에 복잡해지기때문에(뭐가복잡해질까) 추가한다음에 캠프그라운드 모델로가서 모델들에게 author를 업데이트 해줌
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  // console.log(doc);
  if (doc) {
    // await Review.deleteMany({ campground: doc._id }); /// 자동완성인데 이렇게 하면안되나
    await Review.deleteMany({
      _id: { $in: doc.reviews },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
