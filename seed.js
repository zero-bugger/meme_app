var mongoose = require("mongoose");
var meme = require("./models/meme_connections");
var Comment   = require("./models/comments");
 
var data = [
    {
        title: "Cloud's Rest", 
        image: "https://img-9gag-fun.9cache.com/photo/aR0qQpq_460swp.webp",
       
    },
    {
        title: "Desert Mesa", 
        image: "https://img-9gag-fun.9cache.com/photo/aV05OXy_460swp.webp",
      
    },
    {
        title: "Canyon Floor", 
        image: "https://img-9gag-fun.9cache.com/photo/ag5wyLW_460swp.webp",
        
    }
]
 
function seedDB(){
   //Remove all memes
   meme.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed memes!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few memes
            data.forEach(function(seed){
                meme.create(seed, function(err, meme){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a meme");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                            
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    meme.comments.push(comment);
                                    meme.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;