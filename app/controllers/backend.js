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
                    var child = {}, title, url;
                    var img = '';
                    req.pipe(req.busboy);
                    req.busboy.on("file", function(fieldname, file, filename, encoding, mimetype){
                        file.on("data", function(data){
                            img += data;
                        })
                        .on("end", function(){
                            user.memes.push({"title": title, "data": img, "url": url});
                            user.save(function(err){if(err){console.log(err);} else{console.log(user);}});
                           res.redirect('/home');
                        });
                    })
                    .on("field", function(key, val, trunc, valtrunc){
                        if(key=="title"){title = val;}
                        if(key=="url"){url = val;}
                       console.log(key + " + " + val + "\n");
                    });
                    
                };
            }
    });
};
};