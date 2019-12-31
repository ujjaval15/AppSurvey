const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose =require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); //model class

//Automatically call by passport with the user just login 
passport.serializeUser((user, done) => {
    done(null, user.id); //serializeUser to generate the indentification token, monogoDB DB id
});

//Make use of cookie
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);  //DeserializeUser to take cookie and indetify user 
    });
});

//passport use new instance of GoogleStrategy 
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true //to redirct URL to heroku url https or to localhost 
        }, 
        async (accessToken, refreshToken, profile, done ) => {
            console.log("accessToken :", accessToken);
            console.log("refreshToken :", refreshToken);
            console.log("profile :", profile);
            const existingUser = await User.findOne({ googleId: profile.id })
                
            if (existingUser) {
                // we already have a record with the given profile Id
                done(null, existingUser); //param: 1 no error , 2 usrRecord // Done tell passport we are done with authetication and here is the user
            } else {
                //we dont have a user record with this Id, make a new record 
                const user = await new User({ googleId: profile.id }).save(); //model instance , save method , save to the database
                done(null, user); // this user or existingUser pass to serializeUser 
            }
        }
    )
);


// (accessToken, refreshToken, profile, done ) => {
//     console.log("accessToken :", accessToken);
//     console.log("refreshToken :", refreshToken);
//     console.log("profile :", profile);
//     User.findOne({ googleId: profile.id })
//         .then((existingUser) => {
//             if (existingUser) {
//                 // we already have a record with the given profile Id
//                 done(null, existingUser); //param: 1 no error , 2 usrRecord // Done tell passport we are done with authetication and here is the user
//             } else {
//                 //we dont have a user record with this Id, make a new record 
//                 new User({ googleId: profile.id })
//                     .save() //model instance , save method , save to the database
//                     .then(user => done(null, user)); // this user or existingUser pass to serializeUser 
//             }
//         })
// }