// 라우터
// const express = require('express');
const router = require('express').Router();

// 라우터 모듈 내보내기

module.exports = (app) => {
    // 내부 라우터를 처리
    router.get(['/friends/list', '/friends/'], (req, resp) => {
        let db = app.get('db');
        db.collection('friends').find().toArray().then(result => {
            //console.log(result);
            // EJS 템플릿을 이용하여 렌더링
            resp.render('friends_list', // 템플릿 파일명
                { friends: result } // 템플릿에 friends 이름으로 전달.
            ) 

        }).catch(err => {
            resp.status(500)
                .send('Error: ' + "목록을 가져올 수 없습니다.");
        });
    });

    // 작성 폼 페이지
    router.get('/friends/new', (req, resp) => {
        resp.status(200)
            .render('friends_insert_form');
    });

    // 전송 기능
    router.post('/friends/save', (req, resp) => {
        // POST 전송된 데이터는 req.body 확인
        // console.log("전송된 Body: " + req.body);
        let document = req.body;    // <- json: insert
        let db = app.get('db');

        db.collection('friends').insertOne(document).then(result => {
            console.log(result);
            resp.redirect('/web/friends/list'); // 강제 리다이렉트

        }).catch(err => {
            console.error(err);
            resp.status(500)
                .send('Error : 친구를 추가하지 못함');
        })
    })

    return router;
}