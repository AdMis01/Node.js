//pokazywane pliku html


let http = require("http");
let url = require("url");
let fs = require("fs");//odczytywanie plików na serwerze

http.createServer(
    function(req,res){
        //mine type
        //http response status codes
        
        const pathname = url.parse(req.url,true).pathname;
        const filename = "./static"+pathname;
        
        fs.readFile(filename,function(err,data){
            if(err){
                res.writeHead(404,{"Content-type": "text/html"});
                res.end("404 file not found");
                return 
            }
            res.writeHead(200,{"Content-type": "text/html"});
            res.write(data);
            res.end();
        })
    }
).listen(8080);