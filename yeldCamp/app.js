// + 라우트도 보호해줘야함 postman이나 ajax를 사용해서 접근하지 못하도록
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//process.env.NODE_ENV : 환경변수로, 개발 혹은 프로덕션 환경을 표시
//require('dotenv')는 env에 정의한 변수를 가져와서 노드앱의 process.env에 변수를 추가해줌으로써 파일안의 변수에 접근할 수 있게 해줌
// 그런데 프로덕션환경에서는 환경변수를 설정하는방식이 다름(파일에 변수를 저장하지 않고 프로덕션환경에 저장함)
// env파일 띄어쓰기, '' x

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session"); //플래시메세지를 만들고 인증을 위해 세션에 접근하기 위해서
//todo [앱배포후 프로덕션 단계에서 진행] 보안을 위해 로컬메모리세션저장소 사용x
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override"); //
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const userRouters = require("./routes/users");
const campgroundRouters = require("./routes/campgrounds");
const reviewRouters = require("./routes/reviews");

const app = express();

main().catch((err) => {
  console.log("화이팅 오류");
  console.log(err);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("connected to database");
}

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true })); // req.body 익스프레스이용해서 파싱하기
app.use(methodOverride("_method"));
// app.use(express.static("public")); //// 클라이언트가 "/파일명" 경로로 요청할 때 앱의 루트 디렉토리의 "public" 폴더에 있는 파일을 제공.
app.use(express.static(path.join(__dirname, "public")));
// (절대경로)클라이언트가 "/파일명" 경로로 요청할 때 앱이 위치한 디렉토리와 "public" 폴더를 결합해(현재 스크립트가 위치한 디렉토리를 기준으로) 파일을 제공.

const sessionConfig = {
  secret: "프로덕션단계에서실제비밀키로변경예정", //todo 프로덕션 단계에서 실제 비밀키로 변경
  resave: false,
  saveUninitialized: true,
  // todo store: 현재는 개발목적으로쓰는메모리저장소 후에 Mongo 저장소로 변경예정
  cookie: {
    httpOnly: true, // 기본적인 보안옵션, 쿠키에 HttpOnly 플래그가 뜨면 클라이언트 측 스크립트에서 해당 쿠키에 접근이 불가능하고 XSS에 결함이 있거나 사용자가 결함을 일으키는 링크에 접근하면 브라우저가 제 3자에게 쿠키를 유출하지 않도록함
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
// 크롬 검사 애플리케이션 - 쿠키에 connect.sid로 세션ID가 뜨는 것 확인 가능
app.use(flash());
// req.flash에 키-값 쌍을 전달해 플래시를 생성함

app.use(passport.initialize());
app.use(passport.session()); // 영구 로그인 세션을 위한 패스포트 미들웨어(기존 세션 아래에 작성해야함)
passport.use(new LocalStrategy(User.authenticate())); // 우리가 다운로드하고 요청한 LocalStrategy 사용해주겠니?
//authenticate()는 자동으로 추가된 스태틱메소드이고 패스포트 LocalStrategy에서 사용되는 함술르 생성함

passport.serializeUser(User.serializeUser()); // passport에게 사용자를 어떻게 직렬화 하는지 알려주고, 직렬화는 어떻게 데이터를 얻고 세션에서 사용자를 저장하는지 참조
passport.deserializeUser(User.deserializeUser()); //(위에 어렵게 설명했는데, 세션에 정보를 어떻게 저장하고 가져오는지 결정하는 메소드임) (세션의 직렬화된 사용자정보를 passport가 자동으로 역직렬화해줌 req.user에 담기게됨)

// Express.js의 res.locals는 요청-응답 사이클에서 데이터를 애플리케이션에 전달할 수 있는 오브젝트입니다. 이 오브젝트로 저장한 변수는 템플릿 및 다른 미들웨어 함수가 액세스할 수 있습니다.
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  // success가 무엇이던간에 라우트핸들러보다 앞에 작성되어있어 템플릿으로 플래시 메세지에 먼저 접근하게됨. 키가 "success인" flash를 가져오고 로컬변수에 접근가능
  next();
});

// app.get("/fakeUser", async (req, res) => {
//   const user = new User({ email: req.body.email, username: req.body.username }); // 암호는 내제메서드로 전달됨
//   const newUser = await User.register(user, "sdfsd");
//   res.send(newUser);
// });

app.use("/", userRouters);
app.use("/campgrounds", campgroundRouters);
app.use("/campgrounds/:id/reviews", reviewRouters);

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "뭔가 잘못되었어요";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
