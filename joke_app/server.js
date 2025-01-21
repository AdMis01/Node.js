const http = require("http");
const {getJoke, getJokes,getRandom} = require("./controlers/jokecontroler");
const {servrStaticFile} = require('./util/staticServer');

const Port = 8080;
const API = {"Content-type":"application/json"};

const server = http.createServer(async function (req,res) {
    console.log("request");
    if(req.url === '/api/jokes' && req.method === 'GET'){
        let jokes = await getJokes();
        if(jokes){
            res.writeHead(200,API);
        }else{
            res.writeHead(404,API);
            jokes = {message: "Jokes not found"};
        }
        res.end(JSON.stringify(jokes));
    }else if(req.url === '/api/jokes/random' && req.method === 'GET'){
        let joke = await getRandom();
        if(joke){
            res.writeHead(200,API);
        }else{
            res.writeHead(404,API);
            joke = {message: "Jokes not found"};
        }
        res.end(JSON.stringify(joke));

    }else if(req.url.match(/\/api\/jokes\/([0-9]+)/) && req.method === 'GET'){
        const id = req.url.split('/')[3];
        let joke = await getJoke(id);
        if(joke){
            res.writeHead(200,API);
        }else{
            res.writeHead(404,API);
            joke = {message: "Jokes not found"};
        }
        res.end(JSON.stringify(joke));

    }else{
        servrStaticFile(req,res);
    }
}).listen(Port);