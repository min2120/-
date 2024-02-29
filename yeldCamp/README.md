https://github.com/Colt/YelpCamp/tree/master

module.exports

module차이

내보낼때 주의할점

컨트롤러 (MVC라는 프레임워크에서 나온 용어)

이미지업로드 기능추가

문제 1. HTML폼은 서버에 파일을 보낼 수 없음(인코딩 타입 속성과 관련)

문제 2. 어딘가에 사진을 저장해야함 (Mongo는 불가. GridFs나 Cloudinary, aws를 이용)

1.  f에 enctype="multipart/form-data 추가

 <form action="/campgrounds" method="POST" novalidate class="validated-form" enctype="multipart/form-data">

2. <input type="file" name="campground[image]" id="image" />

<input type="file" name="campground[image]" id="image" multiple/> // 파일여러개올릴때

// upload.single('campground[image]') 안의 필드네임은 폼의 input 네임과 같아야함

.post(upload.single('campground[image]'),(req, res) => {  
 });

.post(upload.array('campground[image]'),(req, res) => { }); // 여러개

인디케이터 추가 , 이미지검사추가(갯수, 용량제한)

SQL 인젝션 : 일반적인 익스플로잇 DB쿼리를 만들기위해 사용자 입력의 일부를 사용하는 SQL쿼리를 작성하는곳

Mongo 인젝션

npm i express-mongo-sanitize

크로스사이트스크립팅인 XSS의 취약점 살펴보기

클라이언트 측 스크립트가 웹페이지에 삽입될 때 발생함 해커가 브라우저에서 실행되는 클라이언트 측 스크립트인 코드를 삽입하는 방식으로 애플리케이션을 공격. 우리이 앱에 다른사람이 악의적으로 만든 스크립트를 삽ㄷ입하는것 사용자 쿠키를 보고 유출하거나

원리이해하도록도와주는게임 . xss game

npm i helmet

http header와 관련된.. 보안업그레이드 닥스읽어보고 앱에추가할줄만알믄댐

zpnYgWV81YgvwJFH

npm install mongodb

mongodb+srv://eprnf21:<password>@cluster0.yxksagb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.use(express.static("public"));
app.use(express.static(path.join(\_\_dirname, "public")));

두 코드의 차이를 알려줘
ChatGPT
이 두 줄의 코드는 Express 애플리케이션에서 정적 파일을 제공하는 데 사용됩니다. 그러나 두 코드 간에는 차이가 있습니다.

app.use(express.static("public"));: 이 코드는 애플리케이션 루트 디렉토리의 "public" 폴더에 있는 정적 파일을 제공합니다. 즉, 클라이언트가 "/파일명" 경로로 요청할 때 Express는 "public" 폴더에서 해당 파일을 찾아 제공합니다.

app.use(express.static(path.join(\_\_dirname, "public")));: 이 코드는 애플리케이션 파일이 위치한 디렉토리와 "public" 폴더를 결합하여 정적 파일을 제공합니다. 이렇게 하면 현재 스크립트가 위치한 디렉토리를 기준으로 "public" 폴더가 정적 파일을 제공하는 데 사용됩니다.

보안 및 성능 측면에서 두 코드 모두 동일합니다. 그러나 두 번째 코드(path.join(\_\_dirname, "public"))를 사용하는 것이 약간 더 안전합니다. 왜냐하면 애플리케이션의 루트 디렉토리가 변경될 수 있기 때문입니다. 또한 상대적인 경로 대신 절대 경로를 사용하는 것이 좋은 실천 방법입니다.

하지만 성능 측면에서는 두 코드 간의 차이가 거의 없습니다. 어느 하나를 선택하는 것은 주로 코드의 가독성과 유지 관리 용이성에 따라 달라집니다.

따라서 두 코드 중 어느 것을 선택하느냐는 주로 개발자의 선호도와 코드베이스의 일관성을 유지하기 위한 것입니다.

Q1: 이 코드의 보안 측면에서 주의해야 할 점은 무엇입니까?

Q2: 절대 경로 대신 상대 경로를 사용하는 경우 어떤 장단점이 있습니까?

Q3: Express 정적 파일 제공을 위한 다른 대안적인 방법은 무엇입니까?

todo :::::: 무한스크롤 또는 일부가져오기 (페이지네이션) , 플래시메세지 다르게 구현 , 기타 투두 전부 하기 , 세션저장값이 이상해여 .. 펑션임... ㅋ 왓더

배포 - render (유데미읽기)

좋아요공감
공유하기통계게시글 관리
oris9
🥵
