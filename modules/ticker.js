const util = require('util');
const { EventEmitter } = require('events');

let ticker_target = null;
let ticker = null;

// 이벤트 수신기(on), 전송기(emit) 사용하기 위해 EventEmitter 를 상속
const Ticker = function(target) { // 객체 생성자
    ticker_target = target;

    // 이벤트 수신기
    this.on('stop', () => {
        clearInterval(ticker)
    })
}

// 프로토타입 영역에 공용 메서드 작성
Ticker.prototype.start = () => {
    // setInterval(함수, ms);   => ms 마다 함수를 실행
    //      -> clearInterval(타이머) 로 타이머 리셋
    // setTimeout(함수, ms);    => ms 이후에 함수를 실행
    ticker = setInterval(() => {
        // 1초마다 ticker_taret으로 tick 메시지 전송
        ticker_target.emit('tick');
    }, 1000);
}

// Node의 util 패키지로 EventEmitter의 prototype을 상속
util.inherits(Ticker, EventEmitter);

// Ticker 모듈 내보내기
module.exports = Ticker;