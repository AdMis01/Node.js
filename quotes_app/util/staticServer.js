const fs = require('fs');
const path = require('path');
const url = require('url');

const mineTypes = {
    '.html' : 'text/html',
    '.js' : 'text/javascript',
    '.json' : 'application/json',
    '.css' : 'text/css',
    '.jpg' : 'image/jpeg',
    '.png' : 'image/png'
}

function servrStaticFile(req,res){
    const baseUrl = req.protocol + '://' + req.headers.host + '/';
    const parsedURL = new URL(req.url,baseUrl);
    //console.log(parsedURL);
    let pathSanitazie = path.normalize(parsedURL.pathname);
    let pathName = path.join(__dirname,"..",'static',pathSanitazie);

    if(fs.existsSync(pathName)){
        if(fs.statSync(pathName).isDirectory()){
            pathName += '/index.html';

        }
        fs.readFile(pathName,function(err,data){
            if(err) {
                res.statusCode = 500;
                res.end("nie znaloziono");
            }else{
                const extension = path.parse(pathName).ext;
                res.setHeader('Content-type',mineTypes[extension]);
                res.end(data);
            }
            
        });
    }else{
        res.statusCode = 404;
        res.end("nie znalezniono pliku");
    }
}


module.exports = {
    servrStaticFile
}