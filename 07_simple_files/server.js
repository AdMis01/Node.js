let fs = require('fs');
const filename = "./data/newFile_"+Date.now()+'.txt';
const plikName = "./data/appendFile.txt";
const plikWrite = "./data/writeFile.txt";


fs.open(filename,'w',function(err,file){
    if(err)throw err;
    console.log("zapisano plik");
});

fs.appendFile(plikName,"dane wpisane do pliku",function(err){
    if(err) throw err;
    console.log("zapisano plik z zawartością");
});

fs.writeFile(plikWrite,"tekst w środku", function(err){
    if(err) throw err;
    console.log("zapisano plik");
});

fs.unlink(plikName,function(err){
    if(err) throw err;
    console.log("usunieto plik");
})