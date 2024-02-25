const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.register = async (req, res, next) => {
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
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  // todo 나중에 캐ㅅ어싱크, 어싱크 ㄷ빼기 어싱크안해줘도되는이유..??머지
  req.flash("success", "Welcome back!");
  const redirectUrl = res.locals.returnTo || "/campgrounds"; // update this line to use res.locals.returnTo now
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
};
