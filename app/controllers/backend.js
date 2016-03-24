'use strict';

var User = require("../models/users.js");

module.exports = function(){
    
    this.my = function(req, res){
        User.findById(req.user.id, function(err, user){
           if(err){console.log(err);}
           else{
               if(!user){console.log("You don't exist!");}
               else{
                   res.send(user.pics);
               }
           }
        });
    };
    
};