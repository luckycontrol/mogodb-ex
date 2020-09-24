// Express 모듈
const express = require('express'); // 미들웨어
const http = require('http');   // 실제 http 기능 수행 

// MongoDB 모듈
const { MongoClient } = require('mongodb');

// Express 객체 생성
const app = express();
// set 메서드: Express 내부에 여러 값을 설정 ( 주로 설정 )

app.set('port', 3000);  // port를 3000 사용

function startExpress() {
    // 실제 실행은 express가 아니라 http 모듈이 수행한다.
    http.createServer(app).listen(app.get('port'), () => {
        console.log('Web server is running on port ', app.get('port'));
    });
}

// 정적 파일의 제공
// express의 static을 앱의 미들웨어로 등록
app.use(express.static(__dirname + "/public"));
//  -> public 디렉터리를 정적파일 저장소로 활용.

// 뷰엔진 설정
app.set('view engine', 'ejs');  // 뷰 엔진 설정
app.set('views', __dirname + '/views'); // 템플릿 위치 설정


// 요청 처리
app.get('/', (req, resp) => {
    console.log('[GET]: / :');

    // http 모듈의 전송 방식
    
    // resp.writeHead(200, {'Content-type': 'text/html;charset=utf8'}); // 헤더 전송
    // resp.write("Express Welcome You!");
    // resp.end();
    
    // express의 전송 방식
    resp.status(200)    // 상태 코드
        .header({"Content-Type" : "text/html;charset=utf8"})
        .send("Express Welcome You!");
});

// GET 요청 파라미터의 처리 : URL Query String 처리
// url?key1=val1&&key2=val2
app.get('/query', (req, resp) => {
    console.log('[GET] /query ', req.query);
    // name 파라미터 수신
    let name = req.query.name;

    if (name === undefined || name.length == 0) {
        // 에러
        resp.status(404)
            .contentType("text/plain;charset=utf8")
            .send("Not Found");
    } else {
        resp.status(200)
            .contentType("text/plain;charset=utf8")
            .send("Name: " + name);
    }
});

// URL 파라미터 처리: Pretty URL or Fancy URL
// 요청 데이터를 query가 아닌 url path의 일부로 전송하는 방식
// /urlparam/이름
app.get('/urlparam/:name', (req, resp) => {
    let name = req.params.name;

    if (req.params.name != undefined || req.params.name.length == 0) {
        resp.status(200)
            .contentType('text/html; charset=utf8')
            .send('<h1> Name: ' + name + '</h1>')
            
    } else {
        resp.status(404)
            .contentType('text/html; charset=utf8')
            .send('<h1> Page Not Found </h1>');
    }
});

// 뷰 엔진을 이용한 템플릿 렌더링
app.get('/render', (req, resp) => {
    resp.status(200)
        .contentType('text/html; charset=utf8')
        .render('render');  // render.ejs 템플릿을 렌더링
});

// 라우터 등록 ( 미들웨어 )
const webRouter = require('./router/web')(app);
app.use('/web', webRouter); // 요청이 /web/ .. => 라우터가 처리

// startExpress(); 

function startServer() {
    // 데이터베이스 연결
    const url = 'mongodb://192.168.1.130/27017';

    MongoClient.connect(url, { useUnifiedTopology: true } ).then(client => {
        const db = client.db('mydb');
        console.log('db: ', db);
        // express app에 몽고db 커넥션 setup

        app.set('db', db);

        startExpress();

    }).catch(err => {
        console.error(err);
    })
}

startServer();
