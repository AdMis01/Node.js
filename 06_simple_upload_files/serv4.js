let http = require("http");
let formidable = require("formidable");
let fs = require("fs");
const path = require("path");

const htmlForm = `
<html>
    <head>
        <meta charset="UTF-8">
        <title>formularz</title>
    </head>
    <body>
        <form method="post" action="/upload" enctype="multipart/form-data">
            <input type="file" name="file1"> <br>
            <input type="submit" value="prześlij"><br>
        </form>
    </body>
</html>
`;

http.createServer(function (req, res) {
    if (req.url === "/upload" && req.method.toLowerCase() === "post") {
        let form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) {
                console.log("Błąd podczas przesyłania pliku:", err);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Błąd podczas przesyłania pliku.");
                return;
            }
        
            // Logowanie struktury files
            console.log("Pliki przesłane przez formularz:", JSON.stringify(files, null, 2));
        
            // Obsługa plików
            const uploadedFile = Array.isArray(files.file1) ? files.file1[0] : files.file1;
        
            if (!uploadedFile) {
                console.log("Nie znaleziono pliku.");
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end("Nie przesłano pliku.");
                return;
            }
        
            const tempPath = uploadedFile.filepath;
            const originalFilename = uploadedFile.originalFilename || "plik_bez_nazwy";
            const newPath = path.join(__dirname, "static", originalFilename);
        
            console.log("Nazwa oryginalna:", originalFilename);
            console.log("Ścieżka tymczasowa:", tempPath);
        
            // Tworzenie folderu, jeśli nie istnieje
            fs.mkdir(path.dirname(newPath), { recursive: true }, (mkdirErr) => {
                if (mkdirErr) {
                    console.log("Błąd podczas tworzenia folderu:", mkdirErr);
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Błąd podczas zapisu pliku.");
                    return;
                }
        
                // Kopiowanie pliku
                fs.copyFile(tempPath, newPath, (copyErr) => {
                    if (copyErr) {
                        console.log("Błąd kopiowania pliku:", copyErr);
                        res.writeHead(500, { "Content-Type": "text/plain" });
                        res.end("Błąd podczas zapisu pliku.");
                        return;
                    }
        
                    // Usuwanie pliku tymczasowego
                    fs.unlink(tempPath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.log("Błąd usuwania pliku tymczasowego:", unlinkErr);
                        }
                        console.log("Plik zapisany jako:", newPath);
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end(`Plik "${originalFilename}" został przesłany pomyślnie.`);
                    });
                });
            });
        });
        
    } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(htmlForm);
        res.end();
    }
}).listen(8080, function () {
    console.log("Serwer działa pod adresem: http://localhost:8080");
});
