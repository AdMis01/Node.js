const express = require('express');
const app = express();
const path = require('path');

const viewsPath = path.join(__dirname,'views');
console.log('viewsPATH',viewsPath);

app.set('views',viewsPath);
app.set('view engine','ejs');
app.use(express.static('./public'));

app.get('/', (req,res)=> {
    res.render('pages/home',{
        pageHeading: 'Hello World: ' + req.url
    });

});

const links = [
    {url: '/', name: 'Home'},
    {url: '/articles', name: 'Articles'},
    {url: '/tos', name: 'TOS'}
]

app.get('/loop', (req,res)=> {
    res.render('pages/loop',{
        pageHeading: 'Hello World: ' + req.url,
        links: links
    });

});
app.listen(8080);