const fs = require('fs');
const login_view = fs.readFileSync("./reservationLogin.html");
const membership_view = fs.readFileSync("./membership.html");
const main_view = fs.readFileSync("./reservationMain.html")
const detail_view = fs.readFileSync("./reservationDetail.html");

const database = require('./database/database.js');

async function reservationData(activation, value, table, column) {
    console.log('reservationData Start');
    if (activation == 'SELECT') {

        try {
            const result = database.executeQuery('SELECT ' + column + ' FROM ' + table);
            console.log((await result));
            return (await result);
        } catch (error) {
            console.error('Error fetching product info:', error);
        }

    } else if (activation == 'INSERT') {

        try {
            const result = await database.executeQuery('INSERT INTO ' + table + ' VALUES ' + value);
            console.log(await result);
            return 'OK';
        } catch (error) {
            console.error('Error fetching product info:', error);
        }
    }
}

async function reservationDetail(response, id) {
    console.log("requestHandler.js - CheckId /// id : " + id);

    let getDetail = await reservationData('SELECT', 'WHERE perfomance_index=' + id, 'perfomance', '*');
    let result = getDetail;

    let filePath = path.join(__dirname, 'reservationDetail.html');
    let html = fs.readFileSync(filePath, 'utf-8');

    html += `
        <script>
            const reservationData = ${JSON.stringify(result)};
            console.log("reservationData :", reservationData);
            document.getElementById("data").innerText = JSON.stringify(reservationData);
        </script>
    `;

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);
}


function reservationLogin(response) {
    console.log('main');

    response.writeHead(200, { 'content-Type': ' text/html' });
    response.write(login_view);
    response.end();

}

function reservationMain(response) {
    console.log('reservationMain');

    response.writeHead(200, { 'content-Type': 'text/html' });
    response.write(main_view);
    response.end();

}

function membership(response) {
    console.log('membership');

    response.writeHead(200, { 'content-Type': 'text/html' });
    response.write(membership_view);
    response.end();

}

function membershipcss(response) {
    fs.readFile('./membership.css', function (err, data) {
        if (err) {
            response.writeHead(404);
            response.end('CSS file not found');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
            response.end();
        }
    });
}

function reservationLogincss(response) {
    fs.readFile('./reservationLogin.css', function (err, data) {
        if (err) {
            response.writeHead(404);
            response.end('CSS file not found');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
            response.end();
        }
    });
}

function reservationMaincss(response) {
    fs.readFile('./reservationMain.css', function (err, data) {
        if (err) {
            response.writeHead(404);
            response.end('CSS file not found');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
            response.end();
        }
    });
}

function reservationDetailcss(response) {
    fs.readFile('./reservationDetail.css', function (err, data) {
        if (err) {
            response.writeHead(404);
            response.end('CSS file not found');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
            response.end();
        }
    });
}

async function CheckId(response, needCheckId) {
    console.log("requestHandler.js - CheckId");
    let getids = await reservationData('SELECT', null, 'userinfo', 'user_id');
    let result = "OK";
    for (let i = 0; i < getids.length; i++) {
        if (getids[i].user_id === needCheckId) {
            result = "NO";
            break;
        }
    }
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ result }));
}

async function startMembership(response, id, pwd, name) {
    let getIndex = await reservationData('SELECT', null, 'userinfo', 'user_index');
    let index = getIndex.length + 1;
    console.log('index = ' + index);
    await reservationData('INSERT', "('" + index + "', '" + id + "', '" + name + "', '" + pwd + "', '" + new Date().toISOString().split('T')[0] + "')", 'userinfo', null);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ getIndex }));
}

async function login(response, id, pwd) {
    console.log("requestHandler.js - CheckId /// id : " + id + "///pwd : " + pwd);
    let getids = await reservationData('SELECT', null, 'userinfo', 'user_id, password');
    let result = "NO";
    for (let i = 0; i < getids.length; i++) {
        if (getids[i].user_id === id && getids[i].password === pwd) {
            result = "OK";
            console.log('result : ' + result)
            break;
        }
    }
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ result }));

}

function songa(response) {

    fs.readFile('./img/songa.png', function (err, data) {

        response.writeHead(200, { 'Content-Type': 'text/html' }); //헤더 설정
        response.write(data); //본문 설정
        response.end(); //응답 종료
    })
}

function banel(response) {

    fs.readFile('./img/banel.png', function (err, data) {

        response.writeHead(200, { 'Content-Type': 'text/html' }); //헤더 설정
        response.write(data); //본문 설정
        response.end(); //응답 종료
    })
}

function piona(response) {

    fs.readFile('./img/piona.png', function (err, data) {

        response.writeHead(200, { 'Content-Type': 'text/html' }); //헤더 설정
        response.write(data); //본문 설정
        response.end(); //응답 종료
    })
}

let handle = {};

handle["/"] = reservationMain
handle["/"] = reservationMain
handle["/reservationMain.css"] = reservationMaincss

handle["/reservationLogin.html"] = reservationLogin
handle["/reservationLogin.css"] = reservationLogincss

handle["/membership.html"] = membership
handle["/membership.css"] = membershipcss

handle["/reservationDetail.html"] = reservationDetail
handle["/reservationDetail.css"] = reservationDetailcss

handle["/img/songa.png"] = songa
handle["/img/banel.png"] = banel
handle["/img/piona.png"] = piona

handle["/Login"] = login
handle["/CheckId"] = CheckId
handle["/startMembership"] = startMembership

exports.handle = handle;