//dostępn do req i res oraz opalenie innych funkcji jak jest wywoływany req

const express = require('express');
const app = express();

app.use(function(req,res,next){
    console.log('middleware request mothod', req.method, 'url:', req.url);
    next();
}, function(req, res,next){
    console.log('additional middleware info:', req.url);
    next();
})

app.get('/*',(req,res) => {
    res.status(200).send('test website');
});

app.listen(8080);