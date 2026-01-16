const fs=require('fs');
const main_view = fs.readFileSync("./reservationMain.html");
const membership_view = fs.readFileSync("./membership.html");

function reservationMain(response) {
    console.log('main');
    
    response.writeHead(200, { 'content-Type' : ' text/html'});
    response.write(main_view);
    response.end();

}

function membership(response) {
    console.log('membership');

    response.writeHead(200, { 'content-Type' : 'text/html'});
    response.write(membership_view);
    response.end();

}

handle["/"] = reservationMain
handle["./membership.html"] = membership