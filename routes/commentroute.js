var express=require('express');
var router=express.Router();
var meme=require('../models/meme_connections');
var Comment=require('../models/comments');
///////////#### COMMENTS ROUTE ########/////

router.get("/memes/:id/comments/new",isloggedin,function(req,res){
	meme.findById(req.params.id,function(err,memes){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new",{meme:memes});
		}
	});
	
	
	
});
//POST COMMENTS ROUTE//

router.post("/memes/:id/comments",isloggedin,function(req,res){
	meme.findById(req.params.id,function(err,meme){
		if(err){
			console.log(err);
			res.redirect("/memes")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}
				else{
					 comment.author.id=req.user._id;
					 comment.author.username=req.user.username;
					 comment.save();
					 meme.comments.push(comment);
                     meme.save();
					 res.redirect("/memes/"+meme._id)
					 console.log("Created new comment");
				}
			})
			
		}
	})
})



function isloggedin(req,res,next){
	
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports=router;