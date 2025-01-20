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

                const uploadedFile = Array.isArray(files.file1) ? files.file1[0] : files.file1;

                let tempPath = uploadedFile.filepath;
                let newPath = "./static/" + uploadedFile.originalFilename;
                console.log(tempPath);
                console.log(newPath);

                fs.copyFile(tempPath, newPath, function(err){
                    if(err) {
                        console.log(err);
                        res.end("file upload error");
                    }else{
                        res.end("file send succsesfuls");
                    }
                })
            })
        }else{
            res.writeHead(200,{"content-type": "text/html"});
            res.write(htmlForm);
            return res.end();
        }
    }
).listen(8080,function(){
    console.log("http://localhost:8080/");
});