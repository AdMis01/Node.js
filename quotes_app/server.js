const http = require('http');
const {getQuotes, getQuote , getRandom, prepareDB, insertOne, deleteById} = require('./controllers/quoteControler');
const {servrStaticFile} = require('./util/staticServer');

const PORT = 8080;
const API_CONTENT_TYPE = { "Content-Type" : "application/json" };

const server = http.createServer( async function(req, res) {
    console.log("Request");
    
    //prepareDB();

    if (req.url === "/api/quotes" && req.method === "GET") {
        const quotes = await getQuotes(); 

        if (quotes) {
            res.writeHead(200, API_CONTENT_TYPE);
        } else {
            res.writeHead(404, API_CONTENT_TYPE);
            quotes = { message: "Quotes not found" };
        }

        res.end( JSON.stringify(quotes) );
    } else if (req.url === "/api/quotes/random" && req.method === "GET") {
        let quote = await getRandom(); 
        console.log(quote);

        if (quote) {
            res.writeHead(200, API_CONTENT_TYPE);
        } else {
            res.writeHead(404, API_CONTENT_TYPE);
            quote = { message: "Quote not found." }
        }

        res.end( JSON.stringify(quote) );
    } else if(req.url.match(/\api\/quotes\/()[0-9a-z]+/)){
        const id = req.url.split('/')[3];
        let quote = await getQuote(id);
        if (quote) {
            res.writeHead(200, API_CONTENT_TYPE);
        } else {
            res.writeHead(404, API_CONTENT_TYPE);
            quote = { message: "Quote not found." }
        }
        res.end( JSON.stringify(quote) );

    }else if (req.url === "/api/quote/save" && req.method === "POST") {
        let data = "";

        req.on("data", function (chunk) {
            data += chunk;
        });

        req.on("end", async function() {
            const quote = JSON.parse(data); 

            let response = {};
            const result = await insertOne(quote);

            if (result) {
                res.writeHead(200);
                response = { saved: true, _id: result.insertedId };
            } else {
                res.writeHead(404);
                response = { saved: false, _id: null };
            }

            res.end( JSON.stringify(response) );
        });

    } else if (req.url === "/api/quote/delete" && req.method === "POST") {
        let data = ""; 
        req.on("data", function (chunk) {
            data += chunk;
        });

        req.on("end", async function() {
            const quote = JSON.parse(data);

            if (!quote || !quote._id) {
                res.end( JSON.stringify({ message: "Bad id" }) );
                return;
            } 

            let response = {};
            const result = await deleteById(quote._id);

            if (result && result.deletedCount > 0) {
                res.writeHead(200);
                response = { deleted: true };
            } else {
                res.writeHead(404);
                response = { deleted: false };
            }

            res.end( JSON.stringify(response) );
        });
    }else {
        servrStaticFile(req, res);
    }
} );

server.listen(PORT);