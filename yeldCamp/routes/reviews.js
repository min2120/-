const express = require("express");
const router = express.Router({ mergeParams: true });
// 라우터에 id를 포함하므로 {mergeParams : true} 옵션을 설정해주지 않으면 문서에서 id에 접근불가(설정해주면 app.js의 parms와 reviews.js의 parms가 합쳐짐)

const reviews = require("../controllers/reviews");

const Campground = require("../models/campground");
const Review = require("../models/review");

const {
  isLoggedIn,
  isReviewAuthor,
  validateReview,
} = require("../middleware.js");

const catchAsync = require("../utils/catchAsync");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
