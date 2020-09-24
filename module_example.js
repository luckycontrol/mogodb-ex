// 외부 모듈에서 객체 받아오기 : require

// const add = require('./modules/test_module').add;
// const square = require('./modules/test_module').square;

const { add, square } = require('./modules/test_module');

console.log("add : ", add(10, 20));
console.log("square: ", square(5, 5));

const area = require('./modules/test_modules2').area // 모듈 전체 불러오기

console.log(area.circle(10));