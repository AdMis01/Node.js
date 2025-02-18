const express = require('express');
const app = express();

app.get('/new/:id([0-9]{1,10})',(req,res) =>{
    res.status(200).send('Id:' + req.params.id);
});
//http://localhost:8080/new/1234
app.get('/article/:id(*)',(req,res) =>{
    res.status(200).send('Id:' + req.params.id);
});
//http://localhost:8080/article/24309824398
const handler = (req,res) =>{
    res.json({data: req.params.id});
}
//http://localhost:8080/api/sfdjksfd
//http://localhost:8080/rest/sfdjksfd
app.get('/api/:id(*)',handler);
app.get('/rest/:id(*)',handler);

app.get('/', (req,res) => {
    res.status(200).send('Strona glowna');
});

app.get('*',(req,res) => {
    res.status(404).send('Incalid url');
});

app.listen(8080);