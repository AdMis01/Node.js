let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer(function(req,res){
    let q = url.parse(req.url,true);
    let filename = '.'+q.pathname;
    //console.log(filename);
    fs.readFile(filename,function(err,data){
        if(err){
            res.writeHead(400,{"content-type":"text/html"});
            return res.end("404 not found");
        }
        res.writeHead(200,{"content-type":"text/html"});
        //res.write(data);
        return res.end(data);
    })
}).listen(8080,function(){
    console.log('http://localhost:8080/summer.html');
    console.log('http://localhost:8080/winter.html');
});
//jeżeli znajduje się wiecej niż jeden res.end warto dodwać return do funkcji
//bo mogą wystąpić błędy 