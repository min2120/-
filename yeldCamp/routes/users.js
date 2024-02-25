const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");

const users = require("../controllers/users");

const { storeReturnTo } = require("../middleware");

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  // storeReturnTo를 먼저 호출한 후 passport.authenticate()를 호출하고 나면 마지막 미들웨어 함수가 사용자를 리디렉션하게 됩니다.
  // storeReturnTo 미들웨어 함수를 사용하면, passport.authenticate()가 세션을 지우고
  // req.session.returnTo를 삭제하기 전에 returnTo 값을 res.locals에 저장할 수 있습니다.
  // 그 결과, 나중에 미들웨어 체인에서 returnTo 값에 액세스하고 이 값을 이용해(res.locals.returnTo 사용),
  // 로그인한 사용자를 적절한 페이지로 리디렉션할 수 있습니다
  .post(
    // use the storeReturnTo middleware to save the returnTo value from session to res.locals
    storeReturnTo,
    // passport.authenticate logs the user in and clears req.session
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    // Now we can use res.locals.returnTo to redirect the user after login
    catchAsync(users.login)
  );

router.get("/logout", users.logout);

module.exports = router;
