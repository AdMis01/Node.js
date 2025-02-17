const http = require('http');
const express = require('express');

const app = express();

app.get('/', function(req,res){
    console.log('strona głowna');
    res.status(200).send('strona głowna');
});

app.get('/page1',function(req,res){
    res.status(200).send('strona 1');
})

app.post('/formdata',function(req,res){
    res.status(200).send('strona 1');
})

app.get('/testjson',function(req,res){
    res.json({
        data: 'from server in jason'
    });
})

app.all('/all',function(req,res){
    res.status(200).send('wszystko');

})

app.listen(8080);