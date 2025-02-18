const express = require('express');
const app = express();

app.get('/user/:id',(req,res,next) => {
    if(req.params.id === '0'){
        next('route');
    }else{
        next();
    }
}, function(req, res,next){
    res.send('some response with id:' + req.params.id);
});

app.get('/user/:id',function(req,res,next){
    res.send('another response for user id:' + req.params.id);
})

app.listen(8080);