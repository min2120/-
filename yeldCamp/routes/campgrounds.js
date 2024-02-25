const express = require("express");
const router = express.Router();
// 설정 후, 아래의 app을 전부 router로 바꿔준 후
// app.js에서  [app.use("/campgrounds", campgrounds);] 와 같이 적어준 뒤 본 파일의 코드 내 경로에서 campgrounds 모두 삭제해준다
// 추가적으로 필요한 require을 옮기고(옮길때는 경로수정 필수) 유효성검사와 같이 필요한 코드를 옮겨 추가해준다.
const campgrounds = require("../controllers/campgrounds"); // 일종의 객체임

const catchAsync = require("../utils/catchAsync");

const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

const Campground = require("../models/campground");

// router.get("/makecampground", async (req, res) => {
//   const camp = new Campground({ title: "New Campground" });
//   await camp.save();
//   res.send(camp);
// });

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);
// new가 만약에 :id아래에 위치하면 New가 아이디로 들어가서 제대로 동작이 안됨. 순서를 위로 올려줘야함

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  // 로그인, 권한 나눠서 넣으면 더 구체적인 피드백을 얻을 수 있음 ! 로그인안하면 로그인페이지로, 권한이없으면 메세지를
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
