function route(pathname, handle, response, id, pwd, name) {
    //console.log('pathname : ' + pathname);

    if (typeof handle[pathname] == 'function') {
        console.log(pathname + '정상 작동');
        handle[pathname](response, id, pwd, name);
    } else {
        console.log(pathname + '비정상 작동');
        response.writeHead(404, { 'Content-Type': 'text/html' }); //헤더 설정
        response.write('Not Found'); //본문 설정
        response.end(); //응답 종료
    }
}

exports.route = route;