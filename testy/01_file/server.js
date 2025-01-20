let http = require('http');
let dt = new Date();
let url = require("url");
let {parse} = require("querystring");

http.createServer(function (req, res) {
    console.log("serwej znajduje się ")
    res.writeHead(200, {'Content-Type': 'text/html'});
    let q = url.parse(req.url, true).query;
    let txt = q.year + " " + q.month;
    //res.write("The date and time are currently: " + dt);
    //res.write(req.url);
    res.write(txt);
    res.end();
}).listen(8080,() => {
    console.log("Serwer działa pod adresem: http://localhost:8080");
});