const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");

const { storeReturnTo } = require("../middleware");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    //   res.send(req.body);
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      //   console.log(registeredUser);
      req.login(registeredUser, (err) => {
        // 로그인로그아웃, 콜백이 필요함. err를 입력해 오류매개변수인 콜백만들기 (await 지원안함)
        if (err) return next(err);
        req.flash("success", "welcome");
        res.redirect("/campgrounds");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

// storeReturnTo를 먼저 호출한 후 passport.authenticate()를 호출하고 나면 마지막 미들웨어 함수가 사용자를 리디렉션하게 됩니다.
// storeReturnTo 미들웨어 함수를 사용하면, passport.authenticate()가 세션을 지우고
// req.session.returnTo를 삭제하기 전에 returnTo 값을 res.locals에 저장할 수 있습니다.
// 그 결과, 나중에 미들웨어 체인에서 returnTo 값에 액세스하고 이 값을 이용해(res.locals.returnTo 사용),
// 로그인한 사용자를 적절한 페이지로 리디렉션할 수 있습니다

router.post(
  "/login",
  // use the storeReturnTo middleware to save the returnTo value from session to res.locals
  storeReturnTo,
  // passport.authenticate logs the user in and clears req.session
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  // Now we can use res.locals.returnTo to redirect the user after login
  catchAsync(async (req, res) => {
    // todo 나중에 캐ㅅ어싱크, 어싱크 ㄷ빼기 어싱크안해줘도되는이유..??머지
    req.flash("success", "Welcome back!");
    const redirectUrl = res.locals.returnTo || "/campgrounds"; // update this line to use res.locals.returnTo now
    res.redirect(redirectUrl);
  })
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
});

module.exports = router;
