const express = require('express');
const app = express();
app.get('/article/:date/:title',(req,res) => {
    res.status(200).send('Date:' + req.params.date + ' title:' + req.params.title)
});
//http://localhost:8080/article/2040/hellow

app.get('/file/:id', (req,res) => {
    res.status(200).send('File id: ' + req.params.id);
});
//http://localhost:8080/file/200
app.listen(8080);