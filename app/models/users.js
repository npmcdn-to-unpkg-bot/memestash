'use strict';

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    User = new Schema({
       "_id": Number,
       "name": String,
       "memes": [{
           "_id": Number,
           "title": String,
           "data": Buffer,
           "url": String
       }]
    });
    
module.exports = mongoose.model("User", User);