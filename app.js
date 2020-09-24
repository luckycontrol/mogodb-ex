// Express 모듈
const express = require('express'); // 미들웨어
const http = require('http');   // 실제 http 기능 수행 

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

startExpress();