'use strict';

var express = require("express"),
    routes = require("./app/routes.js"),
    passport = require("passport"),
    mongoose = require("mongoose"),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    busboy = require("connect-busboy"),
    app = express();

require("dotenv").load();
require("./app/passport-config.js")(passport);

app.use('/public', express.static(process.cwd() + '/app/public'));
app.use('/app/controllers', express.static(process.cwd() + '/app/controllers'));
app.use(busboy());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(session({
  secret: 'BenjaminFranklin',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
routes(app, passport);

mongoose.connect(process.env.MONGOLAB_URI);

var port = process.env.PORT || 8080;
app.listen(port, function(){
   console.log("Listening on port " + port + "...\n");
});