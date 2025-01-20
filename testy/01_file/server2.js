let http = require('http');
let fs = require('fs');

fs.appendFile("createdFile.txt","tekst wewnątrz",function(err){
    if(err)throw err;
    console.log("zapisane1");
});//po odpaleniu ponownie tego dodaje do zawartości tekstu 

fs.open("mepodOpen.txt","w",function(err,file){
    if(err) throw err;
    console.log('zapisane2');
    console.log(file+"test");
});//tworzenie pustego pliku

fs.writeFile("createdFile.html","<p>tekst wewnątrz</p>",function(err){
    if(err)throw err;
    console.log("zapisan3");
});//tworzenie pliku

fs.unlink("mepodOpen.txt",function(err){
    if(err) throw err;
    console.log('usunieto plik');
});//niestety dopiero po zamknieciu serwera się usuwa

fs.rename('createdFile.html','zmieniona_nazwa.html', function(err){
    if(err) throw err;
    console.log('zmieniono nazwę pliku');
});

http.createServer(function(req,res){
    fs.readFile("./index.html", function(err,data){
        res.writeHead(200,{"content-type" : "text/html"});
        res.write(data);
        res.end();
    });
}).listen(8080);