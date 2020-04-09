var express=require('express');
var router=express.Router();
var meme=require('../models/meme_connections');


//INDEX PAGE ROUTE

router.get("/memes",function(req,res){
	var currentuser=req.user;
	meme.find({},function(err,memes){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{memes:memes,currentuser:currentuser});
		}
	})
	
})

//NEW PAGE ROUTE
router.get("/memes/new", isloggedin,function(req,res){
		res.render("new");
});


//CREATE PAGE ROUTE
router.post("/memes",  isloggedin,function(req,res){
	var title=req.body.title;
	var image=req.body.image;
	var author={
		id:req.user._id,
		username:req.user.username
	}
	var newobj={title:title,image:image,author:author};
	meme.create(newobj,function(err,newmeme){
		if(err){
			console.log(err);
		}
		else{
			console.log(newobj);
			res.redirect("/memes");
		}
	})
})

//SHOW PAGE ROUTE
router.get("/memes/:id",function(req,res){
	
	meme.findById(req.params.id).populate("comments").exec(function(err,foundmeme){
		if(err){
			console.log(err);
		}
		else{
			res.render("show",{meme:foundmeme});
		}
	})
})


//EDIT PAGE ROUTE
router.get("/memes/:id/edit",function(req,res){
	
	meme.findById(req.params.id,function(err,foundmeme){
		if(err){
			console.log(err);
		}
		else{
			res.render("edit",{meme:foundmeme});
		}
	})
});


// //UPDATE ROUTE
// router.put("/memes/:id",function(req,res){
// 	var title=req.body.name;
// 	var image=req.body.image;
	
// 	var newmeme={title:title,image:image};
// 	meme.findByIdAndUpdate(req.params.id,newmeme,function(err,newmeme){
// 		if(err){
// 			res.redirect("/memes")
// 		}
// 		else{
// 			res.redirect("/memes/"+req.params.id)
// 		}
// 	})
// });


// //Delete Route
// router.delete("/memes/:id",function(req,res){
// 	meme.findByIdAndRemove(req.params.id,function(err){
// 		if(err){
// 			res.redirect("/memes")
// 		}
// 		else{
// 			res.redirect("/memes")
// 		}
// 	})
// });


function isloggedin(req,res,next){
	
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports=router;
