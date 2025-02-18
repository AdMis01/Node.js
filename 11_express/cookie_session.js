//obsługa sesji dzięki cookie informacje w przeglądarce 
// npm install cookie-session

const cookieSession = require('cookie-session');
const express = require('express');
const app = express();

app.use(cookieSession({
    name: 'session',
    keys: ['key1','key2']
}));

app.get('/*', (req,res) => {
    if(!req.session.views){
        req.session.views = 0;
    }
    if(!req.url.endsWith("favicon.ico")){
        req.session.views++;
    }
    if(req.session.views > 20){
        req.session = null;
        req.session = {
            views: 1
        }
    }
    res.end('views count:' + req.session.views);
});

app.listen(8080);