//! 로그인안했을때 쇼페이지에서 강제로 /edit이동시 isAuthor의 req.user._id가 undefined 에러발생
const { campgroundSchema, reviewSchema } = require("./schemas.js"); // json, js목적 스키마인 Joi !! req.body를 불러오기위한목적임을? 기억하기 (모델폴더안의 스키마와 다름)
const ExpressError = require("./utils/ExpressError");
const Campground = require("./models/campground");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  // console.log("REQ.BODY", req.body);
  console.log(req.path, req.originalUrl); //! 에러남 콘솔에 안떠요
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "로그인이 필요합니다");
    res.redirect("/login");
  }
  next();
};

// middleware.js 파일에서, 세션(req.session.returnTo)의 returnTo 값을 res.locals에 저장하기 위해 storeReturnTo라는 새로운 미들웨어 함수를 만드는 코드를 추가합니다.

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
  // console.log(result);
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "권한이 없습니다");
    res.redirect(`/campgrounds/${id}`);
    return;
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "권한이 없습니다");
    res.redirect(`/campgrounds/${id}`);
    return;
  }
  next();
};
