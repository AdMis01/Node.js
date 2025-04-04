import passport from "passport";
import localStrategy from "passport-local";
import {User} from "../models/user.model.js";
import { usersControler } from "../controllers/controller.js";

passport.serializeUser((user,done) =>{
    console.log('serializeUser(), user.id:', user.id);
    done(null,user.id);
});

passport.deserializeUser(async (id,done) => {
    try{
        const userDb = await usersControler.getById(id);
        console.log('deserializeUser(), userDb:', userDb);
        done(null,userDb);

    }catch(err){
        done(err);
    }
});

passport.use(
    "local-signup",
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (req,email, password,done) => {
        try{
            const userExists = await usersControler.getUserByEmail(email);
            if(userExists){
                return done(null,false);
            }

            const userDb = usersControler.createUser({
                name: req.body.name,
                surname: req.body.suname,
                email: email,
                password: password,
                address: req.body.address,
                age: req.body.age,
                schoolId: req.body.schoolId,
            });
            console.log(userDb);
            return done(null,userDb);
        }catch(err){
            done(err);
        }
    })
);

const authUser = async (req, email,password,done) => {
    try{
        const authenticatedUser = await usersControler.getUserByEmail(email);

        if(!authenticatedUser){
            return done(null, false);
        }
        if(!usersControler.validPassword(password,authenticatedUser)){
            return done(null,false);
        }

        return done(null,authenticatedUser);
    }catch(err){
        return done(err);
    }
}

passport.use("local-login", new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
authUser));

export{
    passport
}