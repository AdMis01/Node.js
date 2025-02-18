const express = require('express');
const app = express();

app.use(function(req,res,next){
    req.requestTime = Date.now();
    next();
})

app.get('/*',(req,res) => {
    res.status(200).send('test website time req'+req.requestTime);
});

app.listen(8080);