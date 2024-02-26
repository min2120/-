const express = require("express");
const router = express.Router();
// 설정 후, 아래의 app을 전부 router로 바꿔준 후
// app.js에서  [app.use("/campgrounds", campgrounds);] 와 같이 적어준 뒤 본 파일의 코드 내 경로에서 campgrounds 모두 삭제해준다
// 추가적으로 필요한 require을 옮기고(옮길때는 경로수정 필수) 유효성검사와 같이 필요한 코드를 옮겨 추가해준다.
const campgrounds = require("../controllers/campgrounds"); // 일종의 객체임
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer"); // multer는 body객체와 file 객체를 req객체에 추가해줍니다(내장 body 파싱 미들웨어 역할)
const { storage } = require("../cloudinary"); //index는 따로 입력안해도됨. 폴더에서 자동으로 index.js를 찾기 때문에
const upload = multer({ storage });

const Campground = require("../models/campground");

// router.get("/makecampground", async (req, res) => {
//   const camp = new Campground({ title: "New Campground" });
//   await camp.save();
//   res.send(camp);
// });

router.route("/").get(catchAsync(campgrounds.index)).post(
  isLoggedIn,
  upload.array("campground[image]"),
  validateCampground,
  //! 실제프로덕션상황에서는 유효성 검사 후에 이미지를 업로드 해야하지만
  //! multer 미들웨어 특성상 (멀터는 파싱하는 동안 우선 모두 업로드하고 그 다음 req.body에 접근하는 모든것을 전송함 )
  catchAsync(campgrounds.createCampground)
);

// .post(upload.array("campground[image]"), (req, res) => {
//   // upload.single('campground[image]') 안의 필드네임은 폼의 input 네임과 같아야함
//   console.log(req.body, req.file);
// });

router.get("/new", isLoggedIn, campgrounds.renderNewForm);
// new가 만약에 :id아래에 위치하면 New가 아이디로 들어가서 제대로 동작이 안됨. 순서를 위로 올려줘야함

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("campground[image]"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(
    isLoggedIn,
    isAuthor,
    // upload.array("campground[image]"),
    catchAsync(campgrounds.deleteCampground)
  );

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  // 로그인, 권한 나눠서 넣으면 더 구체적인 피드백을 얻을 수 있음 ! 로그인안하면 로그인페이지로, 권한이없으면 메세지를
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
