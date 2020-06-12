var express=require('express');
var router=express.Router();
var passport=require('passport');
var User=require('../models/User');
var middleware = require('../middleware');


//	DEFAULT PAGE ROUTE	//

router.get("/",function(req,res){
	res.redirect("/memes");
});




//Authentication

router.get("/register",function(req,res){
	res.render("register");
})

router.post("/register",function(req,res){
	var newUser= new User({username:req.body.username});
	console.log(newUser);
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render('register');
		}
			passport.authenticate("local")(req,res,function(){
				res.redirect("/"); 
			});
	});
})


//login route

router.get("/login",function(req,res){
	console.log(req.flash("message"));
	res.render("login",{message: req.flash("message")});
	
	
})


router.post("/login",passport.authenticate("local",{
	successRedirect:"/",
	failureRedirect:"/login"
}),function(req,res){
	
});

router.get("/logout",function(req,res){
	
	req.logout();
	
	res.redirect("/");
});



module.exports=router;