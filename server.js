let http = require('http'); //node.js가 가지고 있는 모듈 가져오기
let url = require('url'); // url 모듈 가져오기

function start(route, handle) {
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname; //url 분석
        let queryData = url.parse(request.url, true).query; //쿼리 데이터 분석

        if (pathname === '/favicon.ico') {
            response.writeHead(200, { 'Content-Type': 'img/x-icon' }); //헤더 설정
            return response.end(); //응답 종료
        }
        route(pathname, handle, response, queryData.productId);
    }

    http.createServer(onRequest).listen(8888); //서버 생성
    //터미널에 node server.js 입력 후 실행
}

exports.start = start;