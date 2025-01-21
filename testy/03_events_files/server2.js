let http = require('http');
let formidable = require("formidable");
let fs = require('fs');

http.createServer(function(req,res){
    if(req.url === '/fileupload'){
        let form = new formidable.IncomingForm();
        form.parse(req, function(err,fields,files){
            console.log(files);
            const uploadedFile = Array.isArray(files.file1) ? files.file1[0] : files.file1;

            let oldPath = uploadedFile.filepath;
            let newPath = './'+ uploadedFile.originalFilename;
            fs.copyFile(oldPath,newPath, function(err){
                if(err) throw err;
                res.write('file upload');
                res.end();
            })
        })
    }else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
    
}).listen(8080,function(){
    console.log('http://localhost:8080/');

})