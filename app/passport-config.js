'use strict';

var TwitStrat = require("passport-twitter"),
    User = require("./models/users.js");
    
module.exports = function(passport){
    
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
    
    passport.use(new TwitStrat({
        consumerKey: process.env.TWITCLI,
        consumerSecret: process.env.TWITSEC,
        callbackURL: process.env.CALLBACK,
        profileFields: ['id', 'displayName']
    }, function(accessToken, refreshToken, profile, done){
        User.findById(profile.id, function(err, user){
           if(err){console.log(err);}
           else{
               if(user){
                   return done(null, user);
               }
               else{
                   var newUser = new User();
                   newUser._id = profile.id;
                   newUser.name = profile.displayName;
                   
                   newUser.save(function(err){if(err){console.log(err);}});
                   return done(null, newUser);
               }
           }
        });
    }));
    
};