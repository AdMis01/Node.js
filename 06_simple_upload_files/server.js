let http = require("http");
let formidable = require("formidable");
let fs = require("fs");
const { json } = require("stream/consumers");

const htmlForm = `
<html>
    <head>
        <meta charset="UTF-8">
        <title>formularz</title>
    </head>
    <body>
        <form method="post" action="/upload" enctype="multipart/form-data">
            <input type="file" name="file1"> <br>
            <input type="submit" value="prześli"><br>
        </form>
    </body>
</html>
`;

http.createServer(
    function(req,res){
        if(req.url === "/upload"){
            let form = new formidable.IncomingForm();
            form.parse(req,function(err,fields,files){
                console.log(JSON.stringify(files));
                let tempPath = files.file1.filepath;
                let newPath = "./static/" + files.file1.originalFilename;

                fs.rename(tempPath, newPath, function(err){
                    if(err) {
                        res.end("file upload error");
                    }else{
                        res.end("file send succsesfuls");
                    }
                })
            })
        }else{
            res.writeHead(200,{"content-type": "text/html"});
            res.write(htmlForm);
            res.end();
        }
    }
).listen(8080);