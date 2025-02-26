import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import expressSession from 'express-session';
import * as path from 'path';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import { connect } from 'http2';

const __dirname = (fileURLToPath(import.meta.url));
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
const authUser = (user, password,done) => {
    console.log(`- author ${user} haslo ${passport}`);

    let authenticatedUser = {
        id: 5,
        username: 'user001',
        surname: 'kowal'
    };

    return done(null, authenticatedUser);
}

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }),
    authUser
);

passport.serializeUser((user,done) => {
    console.log('serialuzeUser ',user);

    done(null,user.id);
});

passport.deserializeUser( (id,done) => {
    console.log('deserializeUser with id',id);

    const userDB = {
        id: 5,
        username: 'user001',
        surname: 'kowal'
    };

    done(null,userDB);
});

const checkAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/')
}

const checkLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        return res.redirect('/dashboard');
    }

    next();
}

let count = 0;
const printRequestData = (req,res,next) => {
    console.log('\nRequest num: ' + (count++) + 'date'+ (new Date()));
    console.log('req.body.username',req.body.username);
    console.log('req.body.password',req.body.passport);
    console.log('req.session.passport',req.session.passport);
    console.log('req.user',req.user);
    console.log('req.sesstion.id',req.session.id);
    console.log('req.sesstion.cookie',req.session.cookie);
    next();
}

app.use(printRequestData);