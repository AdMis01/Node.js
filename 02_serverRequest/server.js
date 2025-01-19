const http = require("http");
const url = require("url");

http.createServer(function(req,res){
    res.writeHead(200,{"content-type" : "text/html"});
    res.write("req.url:" + req.url + " <br>");

    let parsedUrl = url.parse(req.url,true);
    res.write("parsedUrl.pathname: "+ parsedUrl.pathname + " <br>");
    res.write(url.parse(req.url,true).pathname);
    let json = JSON.stringify(parsedUrl);
    res.write(json+ "<br>");
    res.end();
}).listen(8080);