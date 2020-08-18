# express_study
this repository is for personal express study


# Express-Generator

```
// install module
npm install express-generator -g
// quick project architecture build with express-generator
express --view=pug [app_name] 
```

# Routing

라우팅은 URI(또는 경로) 및 특정한 HTTP 요청 메소드(GET, POST 등)인 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 응답하는 방법을 결정하는 것을 말합니다.

route 정의
```
app.METHOD(PATH, HANDLER);
```

app 은 express 객체<br>
METHOD는 HTTP 요청 메서드<br>
PATH 는 요청 경로<br>
HANDLER는 라우트가 일치할 때 실행하는 함수

# 정적 파일

```
//디렉토리 public에 포함된 정적파일들 로드 가능
app.use(express.static('public'));
// 제공되는 파일에 대한 가상 경로 접두부
app.use('/static', express.static(__dirname + '/public'));
```

# 템플릿 엔진

템플릿 엔진은 정적 템플릿 파일들을 사용할 수 있게 합니다. 실행 시, 템플릿 엔진은 템플릿 파일들 안에 있는 변수들을 실제 값으로 변환하고 템플릿을 html 파일로 변환해 클라이언트에 보냅니다.

```
// 템플릿이 있는 디렉토리 경로 설정
app.set('views', __dirname + '/views');
// view 엔진을 ejs로 설정
app.set('view engine', 'ejs');
// html 형식으로 변환
app.engine('html', require('ejs').renderFile);
```