import express from 'express';
import {passport} from './utility/auth.js';
import expressSession from 'express-session';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { authRole } from './utility/acluth.js';
import { rolesArr } from './models/user.model.js';
import { htmlHelper } from './helpers/htmlHelper.js';
import { usersControler,subjectController,gradeController,schoolController } from './controllers/controller.js';
import { School } from './models/school.model.js';
 


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.urlencoded({extended: false}));

app.locals.htmlHelper = htmlHelper;
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

app.get('/register',checkLoggedIn, async(req,res) => {
    console.log('/register');

    const schools = await schoolController.getAll();
    res.render('pages/register.ejs',{
        user: req.user,
        schools: schools
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

app.get('/admin/users',authRole, async (req,res) => {
    console.log('/admin/users');
    const users = await usersControler.getAll();
    res.render('pages/admin/users.ejs',{
        user: req.user,
        users: users
    });
});

app.get('/admin/users/add',authRole, async (req,res) => {
    console.log('/admin/users/add');
    res.render('pages/admin/users_add.ejs',{
        user: req.user
    });
});

app.post('/admin/users/add',authRole, async (req,res) => {
    console.log('post /admin/users/add');
    console.log(req.body)

    const userDB = await usersControler.createUser(req.body);

    res.redirect('/admin/users');
});

app.get('/admin/users/edit/:id',authRole, async (req,res) => {
    console.log('/admin/users/edit:id');
    const {id} = req.params;
    if(!id) return res.redirect('/admin/users');
    const userToEdit = await usersControler.getById(id);

    res.redirect('pages/admin/users_edit.ejs',{
        user: req.user,
        userToEdit: userToEdit
    });
});

app.post('/admin/users/edit/:id',authRole, async (req,res) => {
    console.log('post /admin/users/edit:id');
    const {id} = req.params;
    if(!id) return res.redirect('/admin/users');
    const updatedUser = await usersControler.updateById(id, req.body);

    res.redirect('/admin/users');
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