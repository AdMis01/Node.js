import express from 'express';
import {passport} from './utility/auth.js';
import expressSession from 'express-session';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const checkAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/');
}

const checkLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect('/dashboard');
    }
    next();
}

const viewsPath = path.join(__dirname,'views');
app.set('views',viewsPath);
app.set('view engine','ejs');
app.use(express.static('./public'));

app.get('/register',checkLoggedIn,(req,res) => {
    console.log('/register');
    res.render('pages/register.ejs',{
        user: req.user
    })
});

app.post('/register',passport.authenticate('local-signup',{
    successRedirect: '/login?reg=success',
    failureRedirect: '/register?reg=failure'
}));

app.get('/login',checkLoggedIn,(req,res) => {
    console.log('/login');
    res.render('pages/login.ejs',{
        user: req.user
    })
});

app.post('/login',passport.authenticate('local-login',{
    successRedirect: '/dashboard',
    failureRedirect: '/login?log=failure'
}));

app.get('/dashboard',checkAuthenticated,(req,res) => {
    console.log('/login');
    res.render('pages/dashboard.ejs',{
        user: req.user
    })
});

app.get('/logout',(req,res) => {
    req.logout(function (err){
        console.log('user logged out');
        if(err)return next(err);

        res.redirect('/')
    })
})

app.post('/logout',(req,res) => {
    req.logout(function (err){
        console.log('user logged out');
        if(err)return next(err);

        res.redirect('/')
    })
})

app.get('/',(req,res) => {
    res.render('pages/index.ejs',{
        user: req.user
    });
});

app.listen(3010,() => {
    console.log('serwer dziala');
})