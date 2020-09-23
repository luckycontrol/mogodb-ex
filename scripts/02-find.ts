const { MongoClient } = require('mongodb');
// const MongoClient = require('mongodb').MongoClient; -> 옛날 방식

// mongodb://{서버IP}:{포트번호}/{데이터베이스 이름}

// 클라이언트 생성
const url = "mongodb://192.168.1.130:27017/mydb"
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true})

// 문서 한 개 가져오기
function testFindOne() {
    client.connect().then(client => {
        const db = client.db('mydb');
        db.collection('friends').findOne().then(result => {
            console.log(result);
        });

    }).catch(err => {
        console.error(err);
    });
}

// db collection.find()
// select * from table;
function testFind() {
    client.connect().then(client => {
        const db = client.db('mydb');

        // find는 Promise를 지원하지 않는다. -> 콜백 사용.
        // db.collection('friends').find((err, cursor) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         cursor.forEach(item => {
        //             console.log(item);
        //         });
        //     }
        // });

        // 데이터가 많지 않을 때는 toArray -> Promise 사용
        db.collection('friends').find()
                                .skip(2)    // 2개 건너뛰기
                                .limit(2)   // 2개 가져오기
                                .sort({ name : 1 }) // 1: 오름차순, -1: 내림차순
                                .toArray()
                                .then(result => {
            for (let i=0; i<result.length; i++) {
                console.log(result[i]);
            }
        }).catch(err => {
            console.error(err);
        })

    }).catch(err => {
        console.error(err);
    });
}

testFind();