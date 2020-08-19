# express_study
익스프레스 공부와 정리.

참고 및 출처 : 
[https://expressjs.com/en/4x/api.html],
[https://velopert.com]


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

# 정적 파일 사용

```
// 해당 함수 혹은 미들웨어 함수를 path에 mount. 요청 경로가 path와 일치한다면 함수가 실행된다. path의 디폴트는 '/'
app.use([path,] callback [, callback...])
```

example
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

# RESTful Api

database : data 폴더 안의 json 형식의 파일로 사용

GET method 

```
app.get(path, callback [, callback ...])
```

example
```
app.get('/getUser/:username', function(req,res){
        //data 폴더 안의 user.json 파일에서 가져온 값
        fs.readFile(__dirname + "/../data/user.json", 'utf8', function(err, data){
            var users = JSON.parse(data);
            //req.params 프로퍼티는 라우트 path (/getUser/:username)의 username 으로 들어온 값이다.
            res.json(users[req.params.username]);
        });
    })
```

POST method

```
app.post(path, callback [, callback ...])
```

example
```
    app.post('/addUser/:username', function(req, res){

        // 응답 결과
        var result = {  };
        var username = req.params.username;

        // 패스워드와 이름이 틀리다면
        if(!req.body["password"] || !req.body["name"]){
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
            var users = JSON.parse(data);
            //이미 같은 이름이 있다면
            if(users[username]){
                result["success"] = 0;
                result["error"] = "duplicate";
                res.json(result);
                return;
            }

            // ADD TO DATA
            users[username] = req.body;

            // SAVE DATA
            fs.writeFile(__dirname + "/../data/user.json",
                         JSON.stringify(users, null, '\t'), "utf8", function(err, data){
                result = {"success": 1};
                res.json(result);
            })
        })
    });
```

PUT method

*post와의 차이점 : put method는 식별자가 같은 자원이 있을 경우 대체한다.

```
app.put(path, callback [, callback ...])
```

DELETE method

```
app.delete(path, callback [, callback ...])
```

example
```
app.delete('/deleteUser/:username', function(req, res){
        var result = { };
        //LOAD DATA
        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data){
            var users = JSON.parse(data);

            // IF NOT FOUND
            if(!users[req.params.username]){
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }

            // DELETE FROM DATA
            delete users[req.params.username];

            // SAVE FILE
            fs.writeFile(__dirname + "/../data/user.json",
                         JSON.stringify(users, null, '\t'), "utf8", function(err, data){
                result["success"] = 1;
                res.json(result);
                return;
            })
        })
})
```