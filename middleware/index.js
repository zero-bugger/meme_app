var Campground = require("../models/meme_connections");
var Comment = require("../models/comments");
const  middlewareobj={}


middlewareobj.isloggedin=(req,res,next)=>{
	
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("message","Please Login First!")
	res.redirect("/login");
}


module.exports = middlewareobj;