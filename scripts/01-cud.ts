const { MongoClient } = require('mongodb');
// const MongoClient = require('mongodb').MongoClient; -> 옛날 방식

// mongodb://{서버IP}:{포트번호}/{데이터베이스 이름}

// 클라이언트 생성
const url = "mongodb://192.168.1.130:27017/mydb"
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true})

// 접속 테스트
function testConnection() {
    client.connect((err, client) => {
        // 콜백 함수
        if (err) {
            // 에러 발생 시
            console.error(err);
        } else {
            // 정상 접속
            console.log(client);
        }
    });
}

// testConnection();

// insertOne, insertMany
function testInsertDocument(docs) {
    // doc 배열이면 -> insertMany
    // 객체면 -> insert

    if (Array.isArray(docs)) {
        // insertMany
        // db.collection.insert([{문서}, {문서}...])
        // SQL: insert into table values(...), (...), (...)
        client.connect().then(client => {
            const db = client.db('mydb');
            db.collection('friends').insertMany(docs)
                .then(result => {
                    console.log(result.insertedCount, "개의 문서가 삽입");
                });
        }).catch(err => {
            console.error(err);
        });

    } else {
        // insertOne
        // db.collection.insert({ 문서 });
        // SQL: insert into table values(...);
        client.connect().then(client => {
            const db = client.db('mydb');
            db.collection('friends').insertOne(docs).then(result => {
                console.log(result.insertedCount, "개의 문서가 삽입되었습니다.");
            })
        }).catch(err => {
            console.error(err);
        })
    }
}

// testInsertDocument( { name: "전우치", job: "도사" });
// testInsertDocument([
//     {
//         name: "고길동",
//         gedner: "남",
//         species: "인간",
//         age: 50
//     },
//     {
//         name: "둘리",
//         gender: "남",
//         species: "공룡",
//         age: 100000000
//     },
//     {
//         name: "도우너",
//         gedner: "남",
//         species: "외계인",
//         age: 15
//     },
//     {
//         name: "또치",
//         gender: "여",
//         species: "조류",
//         age: 13
//     },
//     {
//         name: "마이콜",
//         gender: "남",
//         species: "인간",
//         age: 25
//     },
//     {
//         name: "봉미선",
//         gender: "여",
//         species: "인간",
//         age: 35
//     }
// ]);


function testDeleteAll() {
    // db.collection.delete() -> 전체 삭제
    // SQL: delete from table;
    // Promise 방식
    client.connect().then(client => {
        const db = client.db('mydb');
        db.collection('friends').deleteMany({}) //삭제 조건 객체
            .then(result => {
                console.log(result.deletedCount, "개의 문서가 삭제됨.");
            });
        
    }).catch(err => {
        console.error(err);
    });
}

// testDeleteAll();

// Update
// SQL: update table set col=val, col=val ...
// db.collection.update({ 조건 객체 }, { $set: 변경할 내용 })

function testUpdate(condition, doc) {
    client.connect().then(client => {
        const db = client.db('mydb');

        db.collection('friends').updateMany(condition, { $set : doc }).then(result => {
            console.log(result.result.nModified, "개의 문서가 업데이트.");
        }).catch(err => {
            console.error(err);
        });
    });
}

testUpdate(
    { name : "마이콜" }, // 조건 name = "고길동"
    { job : "기타리스트" }  // 변경할 내용
)