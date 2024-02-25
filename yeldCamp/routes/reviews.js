const express = require("express");
const router = express.Router({ mergeParams: true });
// 라우터에 id를 포함하므로 {mergeParams : true} 옵션을 설정해주지 않으면 문서에서 id에 접근불가(설정해주면 app.js의 parms와 reviews.js의 parms가 합쳐짐)

const Campground = require("../models/campground");
const Review = require("../models/review");

const {
  isLoggedIn,
  isReviewAuthor,
  validateReview,
} = require("../middleware.js");

const catchAsync = require("../utils/catchAsync");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Create new Review!");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    //pull 연산자: mongo배열에서 삭제하는 연산자, 가져온 ID와 일치하는 리뷰를 꺼내는데
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash("success", "리뷰삭제성공!");
    res.redirect(`/campgrounds/${id}`);
    // res.send("delete me");
  })
);

module.exports = router;
