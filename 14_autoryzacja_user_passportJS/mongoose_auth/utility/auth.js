import passport from "passport";
import localStrategy from "passport-local";
import {User,makeUser} from "../models/user.model.js";

passport.serializeUser((user,done) =>{
    console.log('serializeUser(), user.id:', user.id);
    done(null,user.id);
});

passport.deserializeUser(async (id,done) => {
    try{
        const userDb = await User.findById(id);
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
    async (email, password,done) => {
        try{
            const userExists = await User.findOne({'email': email});
            if(userExists){
                return done(null,false);
            }

            const user = makeUser(email,password);

            const userDb = await user.save();
            return done(null,userDb);
        }catch(err){
            done(err);
        }
    })
);

const authUser = async (req, email,password,done) => {
    try{
        const authenticatedUser = await User.findOne({email});

        if(!authenticatedUser){
            return done(null, false);
        }
        if(!authenticatedUser.validPassword(password)){
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