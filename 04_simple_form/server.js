let http = require("http");

let {parse} = require("querystring");//sprasowanie danych z formularza do obiektu

const htmlForm = `
<html>
    <head>
        <meta charset="UTF-8">
        <title>formularz</title>
    </head>
    <body>
        <form method="post">
            Imie<input type="text" name="name"><br>
            Nazwisko<input type="text" name="surname"><br>
            Email<input type="text" name="email"><br>
            <input type="submit" value="prześli"><br>
        </form>
    </body>
</html>
`;

http.createServer(
  function(req,res){
    let data = "";
    req.on("data",function(chunk){
        data += chunk;//koljne porcje danych
    });
    req.on("end",function(){
        const pardes = parse(data);
        console.log(JSON.stringify(pardes));
        res.writeHead(200);
        res.write(htmlForm);
        res.end();
    })
  }  
).listen(8080);