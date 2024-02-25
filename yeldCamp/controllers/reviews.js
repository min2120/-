const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash("success", "Create new Review!");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  //pull 연산자: mongo배열에서 삭제하는 연산자, 가져온 ID와 일치하는 리뷰를 꺼내는데
  await Review.findByIdAndDelete(req.params.reviewId);
  req.flash("success", "리뷰삭제성공!");
  res.redirect(`/campgrounds/${id}`);
  // res.send("delete me");
};
