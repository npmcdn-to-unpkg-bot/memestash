'use strict';

var p = process.cwd() + "/app/",
    backendJS = require('./controllers/backend.js');
    
module.exports = function(app, passport){
    var backendJSI = new backendJS;
    function isLoggedIn(req, res, next){
        req.session.redirect_url = req.originalUrl;
        if(req.isAuthenticated()){
            return next();
        } else {
            res.redirect('/');
        }
    }
    
    app.route('/')
    .get(function(req, res){
        res.sendFile(p + "/public/index.html");
    });
    
    app.route('/home')
    .get(isLoggedIn, function(req, res){
       res.sendFile(p + '/public/home.html');
    });
    
    app.route('/my')
    .get(isLoggedIn, backendJSI.my);
    
    app.route('/add')
    .post(isLoggedIn, backendJSI.add);
    
    app.route('/delete/:title')
    .get(isLoggedIn, backendJSI.delete);
    
    app.route('/auth/twitter')
    .get(passport.authenticate("twitter"));
    
    app.route('/auth/twitter/callback')
    .get(passport.authenticate("twitter", {
        failureRedirect: '/'
    }), function(req, res){
        res.redirect("/home");
    });
    
}