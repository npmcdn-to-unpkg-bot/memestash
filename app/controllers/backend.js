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
    
    this.add = function(req, res){
        User.findById(req.user.id, function(err, user){
            if(err){throw err;}
            else{
            if(!user){console.log("Error");}    
            else{
                    req.pipe(req.busboy);
                    
                    req.busboy.on("file", function(fieldname, file, filename, encoding, mimetype){
                        console.log("uploading");
                        console.log(fieldname);
                        console.log(filename);
                        console.log(encoding);
                        console.log(mimetype);
                        file.on("data", function(data){
                            console.log("Data incoming to " + user.name);
                        })
                        .on("end", function(){
                           res.redirect('/home');
                        });
                    })
                };
            }
    });
};
};