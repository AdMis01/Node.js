const http = require('http');

const server = http.createServer( async (req,res) => {
    console.log("request");
    res.writeHead(200);
    res.end("hello world dodawanie ");
});

server.listen(8080,function(){
    console.log("http://localhost:8080/")
})