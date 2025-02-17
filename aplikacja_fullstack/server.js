import http from "http";
import {handleRequest} from "./routes.js";

const server = http.createServer( async (req, res) => {
    await handleRequest(req, res);
});

server.listen(8080, () => {
    console.log("Server started");
});